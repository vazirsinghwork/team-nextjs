'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FieldArray } from 'formik';
import * as Yup from 'yup';
import { postApi } from '@/app/api/apiClient';
import Table from '@/components/table';

interface Props {
  player_id: string
  team_id: string
  player_type: string
  series_match_id: string
}


const playerPopup = ({ teamData, isModalOpen, setIsModalOpen, selectedTeamId }) => {

  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState('');


  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('teamData popup',teamData)
    console.log('selectedTeamId',selectedTeamId)
    const loadPlayers = async () => {
      try {
        const result = await postApi("/team/get_players");
        console.log("result?.data", result);
        setData(result?.data || []); // Fallback to an empty array if data is undefined
      } catch (err) {
        console.error("Error fetching series:", err);
        setError(err?.message || "Failed to fetch series."); // Safely handle error messages
      }
    };

    loadPlayers();
  }, []);


  const initialValues: Props = {
    players: [
      { player_id: "", team_id: "", player_type: "", series_match_id: "" },
    ]
  };

  const validationSchema = Yup.object({
    players: Yup.array().of(
      Yup.object().shape({
        player_id: Yup.string().required("Player ID is required"),
        team_id: Yup.string().required("Team ID is required"),
        player_type: Yup.string().required("Player type is required"),
        series_match_id: Yup.string().required("Series match ID is required"),
      })
    ),
  });

  const handleSubmit = async (
    values: Props,
    { setSubmitting, setFieldError, setStatus }: FormikHelpers<Props> & { setStatus: (status: any) => void },
    actions: { resetForm: () => void }

  ) => {
    try {
      setLoader(true);
      console.log('values', values);
      const data = await postApi('/team/add_team_squad', {team_squad_data: values?.players});
      //actions.resetForm();
      setStatus({ success: 'Added successfully!' });
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
            //validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, values, setFieldValue }) => (
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
                    <div className="card-body ">
                      <Form>
                        <FieldArray
                          name="players"
                          render={(arrayHelpers: any) => (
                            <>
                              {data?.length > 0 ? (
                                <div className="">
                                  {data?.map((item, index) => (
                                    <div className="text-center p-2" key={index}>
                                      <div className="d-flex align-items-center">
                                        <div className="d-flex w-100">
                                          <Field
                                            type="checkbox"
                                            checked={item.isComplete}
                                            onChange={(event) => {
                                              const isChecked = event.target.checked;
                                              console.log('isChecked', isChecked)
                                              console.log('selectedTeamId', selectedTeamId)
                                              console.log('teamData', teamData)
                                              if (isChecked) {
                                                arrayHelpers.replace(index, {
                                                  ...values.players[index],
                                                  player_id: item?.id,
                                                  team_id:selectedTeamId,
                                                  series_match_id: teamData?.id,

                                                });
                                              } else {
                                                arrayHelpers.remove(index);
                                              }
                                            }
                                            }
                                          />
                                          <p className='ml-2'>{item?.name || ""}</p>
                                        </div>
                                        <Field
                                          as="select"
                                          name="player_type"
                                          className="form-select"
                                          aria-label="Default select example"
                                          onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            console.log('selectedValue',selectedValue)
                                            arrayHelpers.replace(index, {
                                              ...values.players[index],
                                              player_type: selectedValue,
                                            });
                                          }}
                                        >
                                          <option value="" disabled>
                                            Select Type
                                          </option>
                                          <option value="bat">Bating</option>
                                          <option value="bowl">Bowler</option>
                                          <option value="ar">All Rounder</option>
                                          <option value="wk">Wicket Keeper</option>
                                        </Field>
                                      </div>
                                    </div>
                                  ))
                                  }
                                </div>
                              ) : null}
                            </>
                          )}
                        />
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
              </div>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default playerPopup;