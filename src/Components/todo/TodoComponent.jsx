import { useNavigate, useParams } from "react-router-dom";
import {
  createNewTodoApi,
  retrieveTodoApi,
  updateTodoApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import moment from "moment";

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
    if (id !== -1) {
      retrieveTodoApi(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }

  const navigate = useNavigate();

  function onSubmit(values) {
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };

    if (id === -1) {
      createNewTodoApi(username, todo)
        .then(navigate("/todos"))
        .catch((error) => console.log(error));
    } else {
      updateTodoApi(username, id, todo)
        .then((response) => {
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    }
  }

  function validate(values) {
    let errors = {
      //   description : "Enter a valid description",
      //   targetDate : 'Enter a valid date'
    };

    if (values.description.length < 5) {
      errors.description = "Enter a valid description";
    }

    if (
      !moment(values.targetDate).isValid() ||
      moment(values.targetDate).isBefore(moment())
    ) {
      errors.targetDate = "Enter a valid date";
    }
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
          validateOnBlur={false}
          validateOnChange={false}
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
