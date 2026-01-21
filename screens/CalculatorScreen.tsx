import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import theme from '../lib/theme';

const BUTTONS: string[][] = [
  ['AC', '+/-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

function isOperator(token: string) {
  return ['+', '-', '×', '÷', '*', '/'].includes(token);
}

// Tokenize the expression into numbers, operators and parentheses
function tokenize(expr: string) {
  const tokens: string[] = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (ch === ' ') {
      i++;
      continue;
    }
    if ('()+-×÷*/'.includes(ch)) {
      tokens.push(ch);
      i++;
      continue;
    }
    // number (may contain decimal)
    if (/[0-9.]/.test(ch)) {
      let num = ch;
      i++;
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        num += expr[i++];
      }
      tokens.push(num);
      continue;
    }
    // Unknown char: skip
    i++;
  }
  return tokens;
}

// Convert infix tokens to RPN using shunting-yard
function infixToRPN(tokens: string[]) {
  const out: string[] = [];
  const ops: string[] = [];
  const precedence: Record<string, number> = {
    '+': 1,
    '-': 1,
    '×': 2,
    '÷': 2,
    '*': 2,
    '/': 2,
  };
  const isLeftAssoc = (op: string) => true;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!isNaN(Number(token))) {
      out.push(token);
      continue;
    }
    if (isOperator(token)) {
      while (
        ops.length > 0 &&
        isOperator(ops[ops.length - 1]) &&
        ((isLeftAssoc(token) && precedence[token] <= precedence[ops[ops.length - 1]]) ||
          (!isLeftAssoc(token) && precedence[token] < precedence[ops[ops.length - 1]]))
      ) {
        out.push(ops.pop() as string);
      }
      ops.push(token);
      continue;
    }
    if (token === '(') {
      ops.push(token);
      continue;
    }
    if (token === ')') {
      while (ops.length > 0 && ops[ops.length - 1] !== '(') {
        out.push(ops.pop() as string);
      }
      ops.pop(); // remove '('
      continue;
    }
  }
  while (ops.length > 0) out.push(ops.pop() as string);
  return out;
}

// Evaluate RPN tokens
function evaluateRPN(tokens: string[]) {
  const stack: number[] = [];
  for (let t of tokens) {
    if (!isNaN(Number(t))) {
      stack.push(Number(t));
      continue;
    }
    const b = stack.pop();
    const a = stack.pop();
    if (a === undefined || b === undefined) return NaN;
    switch (t) {
      case '+':
        stack.push(a + b);
        break;
      case '-':
        stack.push(a - b);
        break;
      case '×':
      case '*':
        stack.push(a * b);
        break;
      case '÷':
      case '/':
        stack.push(a / b);
        break;
      default:
        return NaN;
    }
  }
  return stack.length === 1 ? stack[0] : NaN;
}

export default function CalculatorScreen() {
  const [expr, setExpr] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{expression: string, result: string, timestamp: Date}>>([]);
  const [showHistory, setShowHistory] = useState(false);

  const displayResult = useMemo(() => {
    if (result) return result;
    if (!expr) return '0';
    return expr;
  }, [expr, result]);

  function handlePress(label: string) {
    setPressedKey(label);
    setTimeout(() => setPressedKey(null), 150);
    
    if (label === 'AC') {
      setExpr('');
      setResult('');
      return;
    }
    if (label === '+/-') {
      // Toggle sign of the last number in the expression
      const tokens = tokenize(expr);
      for (let i = tokens.length - 1; i >= 0; i--) {
        if (!isNaN(Number(tokens[i]))) {
          const n = Number(tokens[i]);
          tokens[i] = String(-n);
          break;
        }
      }
      const rebuilt = tokens.join('');
      setExpr(rebuilt);
      setResult('');
      return;
    }
    if (label === '%') {
      // Apply percent to last number: n -> n / 100
      const tokens = tokenize(expr);
      for (let i = tokens.length - 1; i >= 0; i--) {
        if (!isNaN(Number(tokens[i]))) {
          const n = Number(tokens[i]);
          tokens[i] = String(n / 100);
          break;
        }
      }
      setExpr(tokens.join(''));
      setResult('');
      return;
    }
    if (label === '=') {
      if (!expr) return;
      try {
        // Convert to standard operators for parser
        const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/');
        const tokens = tokenize(sanitized);
        const rpn = infixToRPN(tokens);
        const val = evaluateRPN(rpn);
        if (isNaN(val) || !isFinite(val)) {
          setResult('Error');
        } else {
          // Format result to reasonable precision
          const formatted = Math.round((val + Number.EPSILON) * 1e12) / 1e12;
          const resultStr = String(formatted);
          setResult(resultStr);
          
          // Add to history
          if (expr && resultStr !== 'Error') {
            setHistory(prev => [{
              expression: expr,
              result: resultStr,
              timestamp: new Date()
            }, ...prev.slice(0, 9)]); // Keep last 10 calculations
          }
        }
      } catch (e) {
        setResult('Error');
      }
      return;
    }

    // Append numbers/operators
    const lastChar = expr.slice(-1);
    if (isOperator(label)) {
      // Prevent duplicate operators
      if (!expr && label === '+') return; // don't start with +
      if (!expr && label === '-') {
        setExpr(label);
        return;
      }
      if (isOperator(lastChar)) {
        // Replace last operator with new one
        setExpr((prev) => prev.slice(0, -1) + label);
        setResult('');
        return;
      }
      setExpr((prev) => prev + label);
      setResult('');
      return;
    }

    if (label === '.') {
      // Ensure current number doesn't already have a dot
      let i = expr.length - 1;
      while (i >= 0 && /[0-9.]/.test(expr[i])) i--;
      const current = expr.slice(i + 1);
      if (current.includes('.')) return; // ignore
      setExpr((prev) => prev + '.');
      setResult('');
      return;
    }

    // Numbers
    setExpr((prev) => prev + label);
    setResult('');
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safe}>
        <Header title="Calculator" subtitle="Quick math" />
      </SafeAreaView>

      <View style={styles.body}>
        {showHistory && history.length > 0 && (
          <View style={styles.historyPanel}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Recent Calculations</Text>
              <TouchableOpacity onPress={() => setShowHistory(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            {history.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.historyItem}
                onPress={() => {
                  setExpr(item.expression);
                  setResult(item.result);
                  setShowHistory(false);
                }}
              >
                <Text style={styles.historyExpression}>{item.expression}</Text>
                <Text style={styles.historyResult}>= {item.result}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.display}>
          <View style={styles.displayHeader}>
            <Text style={styles.exprText} numberOfLines={1} ellipsizeMode="head">
              {expr || ' '}
            </Text>
            {history.length > 0 && (
              <TouchableOpacity 
                onPress={() => setShowHistory(!showHistory)}
                style={styles.historyButton}
              >
                <Text style={styles.historyButtonText}>📋</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.displayText} numberOfLines={1} ellipsizeMode="tail">
            {displayResult}
          </Text>
        </View>

        <View style={styles.pad}>
          {BUTTONS.map((row, rIdx) => (
            <View style={styles.row} key={`row-${rIdx}`}>
              {row.map((label) => {
                const isZero = label === '0';
                const isOp = ['÷', '×', '-', '+', '='].includes(label);
                const isFunc = ['AC', '+/-', '%'].includes(label);
                return (
                  <TouchableOpacity
                    key={label}
                    activeOpacity={0.8}
                    onPress={(e: GestureResponderEvent) => handlePress(label)}
                    onPressIn={() => setPressedKey(label)}
                    onPressOut={() => setTimeout(() => setPressedKey(null), 100)}
                    style={[
                      styles.key,
                      isZero && styles.keyZero,
                      isOp ? (pressedKey === label ? styles.keyOpPressed : styles.keyOp) : null,
                      isFunc ? (pressedKey === label ? styles.keyFuncPressed : styles.keyFunc) : null,
                      !isOp && !isFunc && pressedKey === label ? styles.keyPressed : null,
                    ]}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel={`Calculator ${label} key ${isOp ? 'operator' : isFunc ? 'function' : 'number'}`}
                    accessibilityHint={`Press to ${label === 'AC' ? 'clear all' : label === '=' ? 'calculate result' : `enter ${label}`}`}>
                    <Text 
                      style={[
                        styles.keyText, 
                        isOp ? styles.keyTextOp : null,
                        pressedKey === label ? styles.keyTextPressed : null
                      ]}
                      accessibilityLiveRegion="polite"
                    >{label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  safe: {
    backgroundColor: theme.colors.surface,
  },
  body: {
    padding: theme.spacing.md,
    flex: 1,
  },
  display: {
    backgroundColor: theme.colors.elevatedSurface,
    borderRadius: theme.radii.md,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    minHeight: 120,
  },
  exprText: {
    fontSize: 14,
    color: theme.colors.onSurfaceMuted,
    alignSelf: 'stretch',
    textAlign: 'right',
  },
  displayText: {
    fontSize: 42,
    color: theme.colors.onSurface,
    fontWeight: '700',
    marginTop: 6,
  },
  pad: {
    // pad holds rows
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  key: {
    backgroundColor: '#0E1A1C',
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 999,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
  },
  keyZero: {
    flex: 2,
    alignItems: 'flex-start',
    paddingLeft: 28,
  },
  keyText: {
    fontSize: 20,
    color: theme.colors.onSurface,
    fontWeight: '600',
  },
  keyOp: {
    backgroundColor: theme.colors.primary,
  },
  keyFunc: {
    backgroundColor: '#0B1416',
  },
  keyPressed: {
    backgroundColor: '#152528',
    transform: [{ scale: 0.95 }],
  },
  keyOpPressed: {
    backgroundColor: '#5AD4A6',
    transform: [{ scale: 0.95 }],
  },
  keyFuncPressed: {
    backgroundColor: '#0F1E22',
    transform: [{ scale: 0.95 }],
  },
  keyTextOp: {
    color: theme.colors.onPrimary,
  },
  keyTextPressed: {
    opacity: 0.8,
  },
  historyPanel: {
    backgroundColor: theme.colors.elevatedSurface,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
    paddingBottom: theme.spacing.sm,
  },
  historyTitle: {
    fontSize: theme.type.body,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  closeButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.surfaceVariant,
  },
  closeButtonText: {
    color: theme.colors.onSurfaceMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  historyItem: {
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  historyExpression: {
    fontSize: theme.type.caption,
    color: theme.colors.onSurfaceMuted,
    marginBottom: 2,
  },
  historyResult: {
    fontSize: theme.type.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  displayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.radii.sm,
    backgroundColor: 'transparent',
  },
  historyButtonText: {
    fontSize: 18,
  },
});