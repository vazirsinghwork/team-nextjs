'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { postApi } from '@/app/api/apiClient';

interface LoginFormValues {
  player_text: string
}

const Popup = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState('');



  const initialValues: LoginFormValues = {
    player_text:'',
  };

  const validationSchema = Yup.object({
    player_text: Yup.string().required('Name is required'),
  });

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setFieldError, setStatus }: FormikHelpers<LoginFormValues> & { setStatus: (status: any) => void },
    actions: { resetForm: () => void }

  ) => {
    try {
      setLoader(true);
      console.log('values', values);
      const data = await postApi('/team/add_players', {
        players: values?.player_text,
      });
      //actions.resetForm();
      setStatus({ success: 'Item added successfully!' });
      setIsModalOpen(false); // Close modal after submission
    } catch (err) {
      console.log('err', err);
      setFieldError('general', err.message);
    } finally {
      setSubmitting(false);
      setLoader(false);
    }
  };

  return (
    <>
      {/* Button to Trigger the Modal */}
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => setIsModalOpen(true)} // Open modal on button click
      >
        Add
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={`modal fade show`} // Use 'show' class when modal is open
          id="addNewModal"
          tabIndex="-1"
          aria-labelledby="addNewModalLabel"
          aria-hidden="false"
          style={{ display: 'block' }} // Make sure modal is visible
        >
          <Formik
            initialValues={initialValues}
           // validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addNewModalLabel">
                      Add New Item
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setIsModalOpen(false)} // Close modal on click
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <Form>



                      <div className="mb-3">
                        <label className="form-label" htmlFor="player_text">
                          Enter Player Names
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          id="player_text"
                          name="player_text"
                          placeholder="Enter payer names"
                          style={{ height: "150px", padding: "10px" }}
                        />
                        <ErrorMessage name="player_text" component="div" style={{ color: 'red' }} />
                      </div>


                      {errors?.general && <p style={{ color: 'red' }}>{errors?.general}</p>}
                      {success && <p style={{ color: 'green' }}>{success}</p>}
                      {loader && (
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setIsModalOpen(false)} // Close modal
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary mt-3"
                          disabled={isSubmitting}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default Popup;