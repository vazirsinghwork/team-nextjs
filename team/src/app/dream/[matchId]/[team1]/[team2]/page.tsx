"use client";

import { Formik, Form, Field, FormikHelpers, FieldArray } from 'formik';
import * as Yup from 'yup';
import { postApi } from '@/app/api/apiClient';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import Image from 'next/image';

export default function Series() {
  const params = useParams<{ matchId : string,team1 : string,team2 : string}>()

  console.log('params:', params);

  const [team1data, setTeam1data] = useState([]);
  const [team2data, setTeam2data] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [initialValuesTeam1, setInitialValuesTeam1] = useState({
    players: [],
  });
  const [initialValuesTeam2, setInitialValuesTeam2] = useState({
    players: [],
  });


  useEffect(() => {
    const {team1,team2}=params
    const loadSeries = async () => {
      try {
        const result = await postApi("/team/get_players_by_match_id",
          {series_match_id:params?.matchId, type:0});
          console.log('result?.data?.team1',result?.data[team1])
          console.log('result?.data?.team1',result?.data[team1])
          console.log('result?.data?.team2',result?.data[team2])
          console.log('result',result)
        setTeam1data(result?.data[team1]);
        setTeam2data(result?.data[team2]);
        setInitialValuesTeam1({ players: result?.data[team1] });
        setInitialValuesTeam2({ players: result?.data[team2] });
      } catch (err) {
        setError(err?.message || "Failed to fetch series.");
      }
    };

    loadSeries();
  }, []);


  interface Props {
    id: string
    is_playing: string
  }


  const handleSubmit = async (
    values: Props,
    { setSubmitting, setFieldError, setStatus }: FormikHelpers<Props> & { setStatus: (status: any) => void },
    actions: { resetForm: () => void }

  ) => {
    try {
      setLoader(true);
      console.log('values', values);
      const data = await postApi('/team/update_team_squad', { team_squad_data: values?.players });
      setStatus({ success: 'Added successfully!' });
    } catch (err) {
      console.log('err', err);
      setFieldError('general', err.message);
    } finally {
      setSubmitting(false);
      setLoader(false);
    }
  };


  return (
    <div>
      <h1>Series Page</h1>
      <p>Welcome to the series page!</p>

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="row p-3">
  <div className="col-5 card bg-secondary-subtle">
  <div className="card-header">
          <h5 className="card-title">Team</h5>
          <div className="card-toolbar">
          </div>
        </div>
  <Formik
            initialValues={initialValuesTeam1}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, errors, values, setFieldValue }) => (
              <div className="card-body ">
                <Form>
                  <FieldArray
                    name="players"
                    render={(arrayHelpers: any) => (
                      <>
                        <div className="row text-center">
                        <div className='col-2'>
                          </div>
                          <div className='col-2'>
                          <span className="fs-6">Type</span>
                          </div>
                          <div className='col-2'>
                          <span className="fs-6">Type</span>
                          </div>
                          <div className='col-2'>
                          <span className="fs-6">Select</span>
                          </div>
                        </div>
                        {team1data?.length > 0 ? (
                          <div>
                            {team1data?.map((item, index) => (
                              <div className="row text-center p-2" key={index}>
                                <div className='col-2'>
                                <Image
                                src={'/user.png'}
                                height={10}
                                width={10}
                                quality={100}
                                layout="responsive"
                                />
                                  </div>
                                  <div className='col-2'>
                                    <p className='ml-2 fs-6'>{item?.name || ""}</p>
                                  </div>
                                  <div className='col-2'>
                                    <p className='ml-2 fs-6'>{item?.player_type || ""}</p>
                                  </div>
                                  <div className='col-2'>
                                    <Field
                                    type="checkbox"
                                    checked={values.players[index]?.is_playing == 1 ? true : false}
                                    onChange={(event) => {
                                      const isChecked = event.target.checked;
                                      console.log('isChecked', isChecked)
                                      if (isChecked) {
                                        arrayHelpers.replace(index, {
                                          ...values.players[index],
                                          is_playing: 1,
                                        });
                                      } else {
                                        arrayHelpers.replace(index, {
                                          ...values.players[index],
                                          is_playing: 0,
                                        });
                                      }
                                    }
                                    }
                                  />
                                  </div>
                              </div>
                            ))
                            }
                          </div>
                        ) : null}
                      </>
                    )}
                  />
                  <div className="card-footer text-end">
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
            )}
          </Formik>
  </div>
  <div className='col-1' />
  <div className="col-5 card bg-secondary-subtle">
  <div className="card-header">
          <h5 className="card-title">Team</h5>
          <div className="card-toolbar">
          </div>
        </div>
  <Formik
            initialValues={initialValuesTeam2}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, errors, values, setFieldValue }) => (
              <div className="card-body ">
                <Form>
                  <FieldArray
                    name="players"
                    render={(arrayHelpers: any) => (
                      <>
                        <div className="row text-center">
                          <div className='col-4'>
                          <p className="">Name</p>
                          </div>
                          <div className='col-4'>
                          <p className="">Type</p>
                          </div>
                          <div className='col-4'>
                          <p className="">Is Playing</p>
                          </div>
                        </div>
                        {team2data?.length > 0 ? (
                          <div>
                            {team2data?.map((item, index) => (
                              <div className="row text-center p-2" key={index}>
                                <div className='col-4'>
                                    <Field
                                      type="checkbox"
                                      checked={values.players[index]?.id != null || undefined ? true : false}
                                      onChange={(event) => {
                                        const isChecked = event.target.checked;
                                        if (isChecked) {
                                          arrayHelpers.replace(index, {
                                            ...values.players[index],
                                            id: item?.id,

                                          });
                                        } else {
                                          arrayHelpers.remove(index);
                                        }
                                      }
                                      }
                                    />
                                    <p className='ml-2'>{item?.name || ""}</p>
                                  </div>
                                  <div className='col-4'>
                                    <Field
                                    as="select"
                                    name="player_type"
                                    value={values.players[index]?.player_type}
                                    className="form-select-sm align-items-center"
                                    aria-label="Default select example"
                                    onChange={(event) => {
                                      const selectedValue = event.target.value;
                                      console.log('selectedValue', selectedValue)
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
                                  <div className='col-4'>
                                    <Field
                                    type="checkbox"
                                    checked={values.players[index]?.is_playing == 1 ? true : false}
                                    onChange={(event) => {
                                      const isChecked = event.target.checked;
                                      console.log('isChecked', isChecked)
                                      if (isChecked) {
                                        arrayHelpers.replace(index, {
                                          ...values.players[index],
                                          is_playing: 1,
                                        });
                                      } else {
                                        arrayHelpers.replace(index, {
                                          ...values.players[index],
                                          is_playing: 0,
                                        });
                                      }
                                    }
                                    }
                                  />
                                  </div>
                              </div>
                            ))
                            }
                          </div>
                        ) : null}
                      </>
                    )}
                  />
                  <div className="card-footer text-end">
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
            )}
          </Formik>
  </div>
</div>
    </div>
  );
}