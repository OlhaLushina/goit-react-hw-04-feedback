import PropTypes from 'prop-types';
import { Item, List } from './Statistics.styled';

export const Statistics = ({ options, total, positivePercentage }) => (
  <List>
    {Object.keys(options).map(item => {
      return (
        <Item key={item}>
          {upperFirstLetter(item)}: {options[item]}
        </Item>
      );
    })}
    <Item>Total: {total}</Item>
    <Item>Positive feedback: {positivePercentage} %</Item>
  </List>
);

Statistics.propTypes = {
  options: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  positivePercentag: PropTypes.number,
};

/* Перша літера  заглавна */
function upperFirstLetter(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}
