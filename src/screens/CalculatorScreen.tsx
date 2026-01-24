import React, { useState } from 'react';
import { theme } from '../lib/theme';

interface CalculatorScreenProps {
  onSettingsClick: () => void;
}

export default function CalculatorScreen({ onSettingsClick }: CalculatorScreenProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ onClick, children, className = '' }: { onClick: () => void, children: React.ReactNode, className?: string }) => (
    <button
      onClick={onClick}
      className={className}
      style={{
        flex: 1,
        height: '60px',
        backgroundColor: theme.colors.elevatedSurface,
        color: theme.colors.onSurface,
        border: `1px solid ${theme.colors.outline}`,
        borderRadius: theme.borderRadius.md,
        fontSize: '20px',
        fontWeight: '600',
        cursor: 'pointer',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.outline;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.elevatedSurface;
      }}
    >
      {children}
    </button>
  );

  const OperatorButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        height: '60px',
        backgroundColor: theme.colors.primary,
        color: 'white',
        border: 'none',
        borderRadius: theme.borderRadius.md,
        fontSize: '20px',
        fontWeight: '600',
        cursor: 'pointer',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#0052cc';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.primary;
      }}
    >
      {children}
    </button>
  );

  return (
    <div style={{
      padding: theme.spacing.lg,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors.surface,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
      }}>
        <h1 style={{
          color: theme.colors.onSurface,
          fontSize: '24px',
          fontWeight: '600',
          margin: 0,
        }}>Calculator</h1>
        
        <button
          onClick={onSettingsClick}
          style={{
            background: 'none',
            border: `1px solid ${theme.colors.outline}`,
            color: theme.colors.onSurface,
            padding: theme.spacing.sm,
            borderRadius: theme.borderRadius.md,
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ⚙️
        </button>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: theme.spacing.md,
      }}>
        <div style={{
          backgroundColor: theme.colors.elevatedSurface,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
          textAlign: 'right',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          <div style={{
            color: theme.colors.onSurface,
            fontSize: '32px',
            fontWeight: '600',
            wordBreak: 'break-all',
          }}>
            {display}
          </div>
        </div>

        <div style={{ display: 'flex', gap: theme.spacing.sm }}>
          <Button onClick={handleClear}>C</Button>
          <Button onClick={() => handleOperation('/')}>÷</Button>
          <Button onClick={() => handleOperation('*')}>×</Button>
          <Button onClick={() => setDisplay(display.slice(0, -1))}>⌫</Button>
        </div>

        <div style={{ display: 'flex', gap: theme.spacing.sm }}>
          <Button onClick={() => handleNumber('7')}>7</Button>
          <Button onClick={() => handleNumber('8')}>8</Button>
          <Button onClick={() => handleNumber('9')}>9</Button>
          <OperatorButton onClick={() => handleOperation('-')}>-</OperatorButton>
        </div>

        <div style={{ display: 'flex', gap: theme.spacing.sm }}>
          <Button onClick={() => handleNumber('4')}>4</Button>
          <Button onClick={() => handleNumber('5')}>5</Button>
          <Button onClick={() => handleNumber('6')}>6</Button>
          <OperatorButton onClick={() => handleOperation('+')}>+</OperatorButton>
        </div>

        <div style={{ display: 'flex', gap: theme.spacing.sm }}>
          <Button onClick={() => handleNumber('1')}>1</Button>
          <Button onClick={() => handleNumber('2')}>2</Button>
          <Button onClick={() => handleNumber('3')}>3</Button>
          <OperatorButton onClick={handleEqual}>=</OperatorButton>
        </div>

        <div style={{ display: 'flex', gap: theme.spacing.sm }}>
          <Button onClick={() => handleNumber('0')}>0</Button>
          <Button onClick={handleDecimal}>.</Button>
          <Button onClick={() => handleNumber('00')}>00</Button>
          <Button onClick={() => handleNumber('%')}>%</Button>
        </div>
      </div>
    </div>
  );
}