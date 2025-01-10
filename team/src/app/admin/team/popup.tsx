'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { postApi } from '@/app/api/apiClient';

interface LoginFormValues {
  name: string;
  short_name: string;
  country: string;
}

const Popup = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState('');


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await postApi('team/countries',{hjj:''});
        console.log('response.data nvaz', response?.data);
        setCountries(response?.data);
      } catch (error) {
        console.error('Error fetching countries', error);
      }
    };
    fetchCountries();
  }, []);

  const initialValues: LoginFormValues = {
    name: '',
    short_name: '',
    country: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    short_name: Yup.string().required('Short name is required'),
  });

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setFieldError, setStatus }: FormikHelpers<LoginFormValues> & { setStatus: (status: any) => void },
    actions: { resetForm: () => void }

  ) => {
    try {
      setLoader(true);
      console.log('values', values);
      const data = await postApi('/team/add_team', {
        name: values?.name,
        short_name: values?.short_name,
        country_id: values?.country,
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
            validationSchema={validationSchema}
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
                        <label className="form-label" htmlFor="name">
                          Name
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                        />
                        <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="short_name">
                          Short Name
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          id="short_name"
                          name="short_name"
                          placeholder="Enter short name"
                        />
                        <ErrorMessage name="short_name" component="div" style={{ color: 'red' }} />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="country">
                          Select Country
                        </label>
                        <Field as="select" name="country" className="form-control">
                          <option value="">Select Country</option>
                          {countries?.map((item, index) => (
                            <option key={index} value={item?.id}>
                              {item?.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="country" component="div" style={{ color: 'red' }} />
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