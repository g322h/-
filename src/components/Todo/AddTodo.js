import PropTypes from 'prop-types';
import { useInputValue } from '../../hooks';

export default function AddTodo({ onCreate }) {
  const input = useInputValue('');

  function submitHandler(event) {
    event.preventDefault();

    if (input.value()) {
      onCreate(input.value());
      input.clear();
    }
  }

  return (
    <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type="submit">Add todo</button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
