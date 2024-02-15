import { useParams } from "react-router-dom";
import { retrieveTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Field, Formik, Form } from "formik";

export default function TodoComponent() {
  //parameters
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;

  //Data set
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => retrieveTodo(), [id]);

  function retrieveTodo() {
    retrieveTodoApi(username, id)
      .then((response) => {
        setDescription(response.data.description)
        setTargetDate(response.data.targetDate)
    })
      .catch((error) => console.log(error));
  }

  function onSubmit(values) {
    console.log(values)
  }

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      {description}
      <div>
        <Formik initialValues={ {description, targetDate} } 
            enableReinitialize={true}
            onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
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
                <button className="btn btn-success m-5" type="submit">Save Changes</button>
            </div>
          </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
