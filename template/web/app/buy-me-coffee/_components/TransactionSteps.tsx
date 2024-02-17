import { useCallback } from 'react';
import { SymbolIcon } from '@radix-ui/react-icons';
import Button from '@/components/Button/Button';
import { TRANSACTION_STEPS } from './ContractDemo';
import TransactionStep from './TransactionStep';

type TransactionStepsProps = {
  transactionStep: TRANSACTION_STEPS | null;
  setTransactionStep: React.Dispatch<React.SetStateAction<TRANSACTION_STEPS | null>>;
  numCoffees: number;
  gasCost: number;
};

export default function TransactionSteps({
  transactionStep,
  numCoffees,
  setTransactionStep,
  gasCost,
}: TransactionStepsProps) {
  const resetStep = useCallback(() => {
    setTransactionStep(null);
  }, [setTransactionStep]);

  if (transactionStep === TRANSACTION_STEPS.START) {
    return (
      <TransactionStep
        status="Coffee brewing..."
        icon="☕"
        helpText="Please confirm transaction in your wallet"
      >
        <Button
          buttonContent={<span>Transaction pending</span>}
          icon={<SymbolIcon width={15} height={15} />}
          variant="secondary"
        />
      </TransactionStep>
    );
  }

  if (transactionStep === TRANSACTION_STEPS.COMPLETE) {
    return (
      <TransactionStep
        status={`You bought ${numCoffees} coffee${numCoffees > 1 ? 's' : ''}!`}
        icon="🎁"
        helpText="Thank you for supporting this endeavor!"
      >
        <Button buttonContent="Send another coffee" onClick={resetStep} />
      </TransactionStep>
    );
  }

  if (transactionStep === TRANSACTION_STEPS.OUT_OF_GAS) {
    return (
      <TransactionStep
        status="You are out of gas"
        icon="⛽"
        helpText={`Please fund your wallet with at least ${String(
          gasCost,
        )} ETH and try sending a coffee again.`}
      >
        <Button buttonContent="Got it" onClick={resetStep} />
      </TransactionStep>
    );
  }

  throw Error('Missing TRANSACTION_STEPS handler');
}
