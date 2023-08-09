import { useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [isNameTouched, setIsNameTouched] = useState(false);

  const [enteredStreet, setEnteredStreet] = useState("");
  const [isStreetTouched, setIsStreetTouched] = useState(false);

  const [enteredPostal, setEnteredPostal] = useState("");
  const [isPostalTouched, setIsPostalTouched] = useState(false);

  const isEmpty = (value) => value.trim() === "";
  const enteredNameIsValid = !isEmpty(enteredName);
  const enteredStreetIsValid = !isEmpty(enteredStreet);
  const enteredPostalIsValid = !isEmpty(enteredPostal);

  const nameHasError = !enteredNameIsValid && isNameTouched;
  const streetHasError = !enteredStreetIsValid && isStreetTouched;
  const postalHasError = !enteredPostalIsValid && isPostalTouched;

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const nameBlurHandler = (event) => {
    setIsNameTouched(true);
  };

  const streetChangeHandler = (event) => {
    setEnteredStreet(event.target.value);
  };

  const streetBlurHandler = (event) => {
    setIsStreetTouched(true);
  };

  const postalChangeHandler = (event) => {
    setEnteredPostal(event.target.value);
  };

  const postalBlurHandler = (event) => {
    setIsPostalTouched(true);
  };

  let formIsValid = false;

  if (enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setIsNameTouched(true);
    setIsStreetTouched(true);
    setIsPostalTouched(true);

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
    });
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div
        className={`${classes.control} ${nameHasError ? classes.invalid : ""}`}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <p className={classes["error-message"]}>Name cannot be blank</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          streetHasError ? classes.invalid : ""
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && (
          <p className={classes["error-message"]}>Street cannot be blank</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          postalHasError ? classes.invalid : ""
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && (
          <p className={classes["error-message"]}>Postal cannot be blank</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
