import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  /* Залишити відгук */
  const leaveFeedback = type => {
    switch (type) {
      case 'good': {
        setGood(prevState => prevState + 1);
        break;
      }
      case 'neutral': {
        setNeutral(prevState => prevState + 1);
        break;
      }
      case 'bad': {
        setBad(prevState => prevState + 1);
        break;
      }
      default:
        return;
    }
  };

  /* Кількість усіх відгуків */
  const countTotalFeedback = () => good + neutral + bad;

  /* Відсоток позитивних відгуків */
  const countPositiveFeedbackPercentage = () => {
    // Кількість усіх відгуків
    const total = countTotalFeedback();

    // Процент позитивних відгуків
    const positivePercentage = total ? (good * 100) / total : 0;

    // Якщо число не ціле, то залишаємо 2 цифри після коми
    return Number.isInteger(positivePercentage)
      ? positivePercentage
      : positivePercentage.toFixed(2);
  };

  return (
    <>
      <GlobalStyle />
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={leaveFeedback}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            options={{ good, neutral, bad }}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};
