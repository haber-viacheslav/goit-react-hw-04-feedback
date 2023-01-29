import { useState } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';
import PropTypes from 'prop-types';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const options = ['good', 'neutral', 'bad'];

  const onLeaveFeedback = option => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        console.log(good);

        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        console.log(neutral);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        console.log(bad);
        break;
      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    const total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good * 100) / countTotalFeedback() || 0);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex-start',
        padding: '40px',
        flexDirection: 'column',
        gap: '40px',
        color: '#010101',
      }}
    >
      <Section title={'Please leave feedback'}>
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      {!countTotalFeedback() ? (
        <Notification message="There is no feedback"></Notification>
      ) : (
        <Section title={'Statistics'}>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )}
    </div>
  );
};

App.propTypes = {
  good: PropTypes.number,
  neutral: PropTypes.number,
  bad: PropTypes.number,
};

// export class App extends Component {
//   static defaultProps = {
//     state: PropTypes.shape({
//       good: PropTypes.number.isRequired,
//       neutral: PropTypes.number.isRequired,
//       bad: PropTypes.number.isRequired,
//     }).isRequired,
//   };

//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   onLeaveFeedback = option => {
//     this.setState({ [option]: this.state[option] + 1 });
//   };

//   countTotalFeedback = () =>
//     Object.values(this.state).reduce((value, acc) => (acc += value), 0);

//   countPositiveFeedbackPercentage = ({ good } = this.state) => {
//     return Math.round((good * 100) / this.countTotalFeedback() || 0);
//   };

//   render() {
//     const options = Object.keys(this.state);
//     const { good, neutral, bad } = this.state;

//     return (
//       <div
//         style={{
//           height: '100vh',
//           display: 'flex-start',
//           padding: '40px',
//           flexDirection: 'column',
//           gap: '40px',
//           color: '#010101',
//         }}
//       >
//         <Section title={'Please leave feedback'}>
//           <FeedbackOptions
//             options={options}
//             onLeaveFeedback={this.onLeaveFeedback}
//           />
//         </Section>

//         {!this.countTotalFeedback() ? (
//           <Notification message="There is no feedback"></Notification>
//         ) : (
//           <Section title={'Statistics'}>
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={this.countTotalFeedback()}
//               positivePercentage={this.countPositiveFeedbackPercentage()}
//             />
//           </Section>
//         )}
//       </div>
//     );
//   }
// }
