import { useParams } from "react-router-dom";
import { retrieveTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";

export default function TodoComponent() {
  //parameters
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;

  //Data set
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => retrieveTodo(), [id]);

  function retrieveTodo() {
    retrieveTodoApi(username, id)
      .then((response) => {
        setDescription(response.data.description);
        setTargetDate(response.data.targetDate);
      })
      .catch((error) => console.log(error));
  }

  function onSubmit(values) {
    console.log('submitted');
  }

  function validate(values) {
    let errors = {
    //   description : "Enter a valid description",
    //   targetDate : 'Enter a valid date'
    };

    if (values.description.length < 5) {
      errors.description = "Enter a valid description";
    }   

    if (new Date(values.targetDate) < new Date()) {
      errors.targetDate = "Enter a valid date";
    }
    console.log('validate');
    return errors;
  }

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      {description}
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}

        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"

              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                ></Field>
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field
                  type="date"
                  className="form-control"
                  name="targetDate"
                ></Field>
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
