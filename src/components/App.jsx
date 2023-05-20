import { GlobalStyle } from './GlobalStyle';
import { Component } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  /* Залишити відгук */
  leaveFeedback = type => {
    this.setState(prevState => ({ [type]: prevState[type] + 1 }));
  };

  /* Кількість усіх відгуків */
  countTotalFeedback = () =>
    Object.values(this.state).reduce((total, number) => total + number, 0);

  /* Відсоток позитивних відгуків */
  countPositiveFeedbackPercentage = () => {
    // Кількість усіх відгуків
    const total = this.countTotalFeedback();

    // Процент позитивних відгуків
    const positivePercentage = total ? (this.state.good * 100) / total : 0;

    // Якщо число не ціле, то залишаємо 2 цифри після коми
    return Number.isInteger(positivePercentage)
      ? positivePercentage
      : positivePercentage.toFixed(2);
  };

  render() {
    return (
      <>
        <GlobalStyle />
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.leaveFeedback}
          ></FeedbackOptions>
        </Section>
        <Section title="Statistics">
          {this.countTotalFeedback() > 0 ? (
            <Statistics
              options={this.state}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            ></Statistics>
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    );
  }
}
