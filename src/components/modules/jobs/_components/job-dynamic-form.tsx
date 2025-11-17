import { USER_TYPE_TEXTS } from '@/constants/auth-consts';
import { SELECT_COMPONENT_STYLES } from '@/constants/styles';
import { useFetchDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { APPROXIMATE_TIME_TO_COMPLETE, SkillTypeLists } from '@/lib/utils';
import { START_END_INDICATION_TIME } from '@/types';
import { Button, Input } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { parse, format, addMinutes } from 'date-fns';


type Props = {
  handleFormSubmission: (data: any) => Promise<any>;
  values?: any; // optional prefill object
  isAssignJob?: boolean;
};


const JobDynamicForm = ({handleFormSubmission, values, isAssignJob }: Props) => {

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const selectedPolyhouse = useAppSelector(state => state.polyhouse.selectedPolyhouse);
  const currentUser = useAppSelector(state => state.user.currentUser);

  // Local states
  const [skill_type, setSkillType] = useState<any>(null);
  const [skill_level_activity, setSkillLevelActivity] = useState<any>(null);
  const [approximate_time_to_complete, setApproximateTimeToComplete] = useState<any>(null);
  const [selected_labours, setSelectedLabours] = useState<any>(null);

  const today = new Date();
  const [startDate, setStartDate] = useState(format(today, 'yyyy-MM-dd'));
  const [realTimeStart, setRealTimeStart] = useState('00:00');
  const [startIndicator, setStartIndicator] = useState<any>(null);
  const [endIndicator, setEndIndicator] = useState<any>(null);

  const polyhouse_id =
    currentUser?.user_type === USER_TYPE_TEXTS.OWNER
      ? selectedPolyhouse?.value
      : currentUser?.polyhouse_id;

  const { data: fetchedData } = useFetchDataAsPerEndpoint(``, `jobs`);
  const { data: laboursData } = useFetchDataAsPerEndpoint(`${polyhouse_id}`, `labours_data`);
  const listOfJobsBasedOnSkillType = useMemo(() => {
    if (!skill_type) return [];
  
    return fetchedData?.data
      ?.filter((job: any) => job?.skill_type === skill_type?.value)
      ?.map((job: any) => ({
        label: job?.job,
        value: job?.job,
        ...job,
      }))
      ?.sort((a: any, b: any) =>
        a.label.localeCompare(b.label) // Alphabetical sort
      );
  }, [skill_type, fetchedData?.data]);
  

  const listOfLaboursBasedOnSkillType = useMemo(() => {

    if (!skill_type)
      return laboursData?.data?.map((labour: any) => ({
        label: labour?.first_name + ' ' + labour?.last_name,
        value: labour?._id,
        ...labour,
      }));
    return laboursData?.data
      ?.filter((labour: any) => labour?.skill_type?.toLowerCase() === skill_type?.value?.toLowerCase())
      ?.map((labour: any) => ({
        label: labour?.first_name + ' ' + labour?.last_name,
        value: labour?._id,
        ...labour,
      }))
      ?.sort((a: any, b: any) =>
        a.label.localeCompare(b.label) // Alphabetical sort
      );
  }, [skill_type, laboursData?.data]);

  // ⬇ Prefill effect
  useEffect(() => {
    if (!values || Object.keys(values).length === 0) return; // guard for empty object
  
    // Reset form before applying new values
    setSkillType(null);
    setSkillLevelActivity(null);
    setApproximateTimeToComplete(null);
    setSelectedLabours(null);
    setStartDate(format(today, 'yyyy-MM-dd'));
    setRealTimeStart('00:00');
    setStartIndicator(null);
    setEndIndicator(null);
  
    // Prefill only if values exist
    if (values.skill_type) {
      const skill_type = SkillTypeLists.find(opt => opt.value === values.skill_type);
      setSkillType(skill_type || null);
    }
    if (values.skill_level_activity) {
      setSkillLevelActivity({
        label: values.skill_level_activity,
        value: values.skill_level_activity,
      });
    }
    if (values.time_duration) {
      const time_duration = APPROXIMATE_TIME_TO_COMPLETE?.find(opt => opt.value === values.time_duration);
      setApproximateTimeToComplete(()=>time_duration);
    }

    if (values.labour_id && laboursData?.data) {
      const labour = laboursData.data.find((l: any) => l._id === values.labour_id);

      if (labour) {
        setSelectedLabours({
          label: labour.first_name + ' ' + labour.last_name,
          value: labour._id,
          ...labour,
        });
      }
    }
    if (values.start_date) setStartDate(values.start_date);
    if (values.start_time_24H) setRealTimeStart(values.start_time_24H);
    if (values.start_indicator) {
      setStartIndicator(
        START_END_INDICATION_TIME.find(opt => opt.value === values.start_indicator) || null
      );
    }
    if (values.end_indicator) {
      setEndIndicator(
        START_END_INDICATION_TIME.find(opt => opt.value === values.end_indicator) || null
      );
    }
  }, [values, laboursData?.data]);
  

  async function handleFormSubmit(e: any) {
    e.preventDefault();
    const startTime = parse(realTimeStart, 'HH:mm', new Date());
    const totalMinutes = approximate_time_to_complete?.value * 60;
    const endTime = addMinutes(startTime, totalMinutes);
    const formattedEndTime = format(endTime, 'HH:mm');
    const formattedStartTime = format(startTime, 'HH:mm');

    const data = {
      job: skill_level_activity?.value,
      full_name: selected_labours?.first_name + ' ' + selected_labours?.last_name,
      labour_id: selected_labours?._id,
      skill_type: skill_type?.value,
      skill_level_activity: skill_level_activity?.value,
      time_duration: approximate_time_to_complete?.value,
      start_time_12H: format(startTime, 'hh:mm a'),
      end_time_12H: format(endTime, 'hh:mm a'),
      start_time_24H: formattedStartTime,
      end_time_24H: formattedEndTime,
      start_indicator: startIndicator?.value ?? 0,
      end_indicator: endIndicator?.value ?? 0,
      polyhouse_id: polyhouse_id,
      supervisor: `${currentUser?._id}`,
      status: 'pending',
      start_date: startDate,
    };

    try {
      const res=await handleFormSubmission(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
  if(isAssignJob){
    const time_duration = APPROXIMATE_TIME_TO_COMPLETE.find(
      opt => opt.value === skill_level_activity?.time_duration
    )
    setApproximateTimeToComplete(time_duration)
  }
  }, [skill_level_activity, isAssignJob]);



  return (
    <div>
        <form onSubmit={handleFormSubmit}>
          <section className={`grid md:grid-cols-2 gap-[1%]`}>
            <div>
              <label htmlFor="skill_type" >Skill Category</label>
              <Select
                className="border rounded-lg capitalize"
                options={SkillTypeLists}
                isClearable
                id={"skill_type"}
                isSearchable
                value={skill_type}
                styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                onChange={(option: any) => setSkillType(option)}
                placeholder={"Select Skill Level"}
              />
            </div>
            <div>
              <label htmlFor="skill_level_activity" >Skill Level Activity</label>
              <Select
                className="border rounded-lg capitalize"
                options={listOfJobsBasedOnSkillType}
                isClearable
                isSearchable
                id={'skill_level_activity'}
                value={skill_level_activity}
                styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                onChange={(option: any) => setSkillLevelActivity(option)}
                placeholder={"Select Activity"}
              />
            </div>
            <div>
              <label htmlFor="labour" >Select Labours</label>
              <Select
                className="border rounded-lg capitalize"
                options={listOfLaboursBasedOnSkillType}
                isClearable
                isSearchable
                id={'labour'}
                value={selected_labours}
                styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                onChange={(option: any) => setSelectedLabours(option)}
                placeholder={"Select Labours"}
              />
            </div>
            <div>
              <label htmlFor="approximate_time_to_complete" >Approximate Time to Complete</label>
              <Select
                className="border rounded-lg capitalize"
                options={APPROXIMATE_TIME_TO_COMPLETE}
                isClearable
                isSearchable
                id={"approximate_time_to_complete"}
                value={approximate_time_to_complete}
                styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                onChange={(option: any) => setApproximateTimeToComplete(option)}
                placeholder={"Select Time to Complete"}
              />
            </div>
          
            <div className='flex flex-col'>
                                    <label htmlFor="start_date">Start Date</label>
                                    {/* <TimePicker onChange={setRealTimeStart} value={realTimeStart} /> */}
                                    <Input type="date" id={'start_date'} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                </div>

                                <div  className='flex flex-col'>
                                    <label htmlFor="start_time_24H">Real Time Start</label>
                                    {/* <TimePicker onChange={setRealTimeStart} value={realTimeStart} /> */}
                                    <Input id={"start_time_24H"} type="time" value={realTimeStart} onChange={(e) => setRealTimeStart(e.target.value)} />
                                </div>
                                <div>
              <label htmlFor="start_indicator" >Start Indicator</label>
              <Select
                className="border rounded-lg capitalize"
                options={START_END_INDICATION_TIME}
                id={'start_indicator'}
                isClearable
                isSearchable
                value={startIndicator}
                styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                onChange={(option: any) => setStartIndicator(option)}
                placeholder={"Select Labours"}
              />
            </div>
            <div>
              <label htmlFor="end_indicator" >End Indicator</label>
              <Select
                className="border rounded-lg capitalize"
                options={START_END_INDICATION_TIME}
                id={'end_indicator'}
                isClearable
                isSearchable
                value={endIndicator}
                styles={SELECT_COMPONENT_STYLES(isDarkMode)}
                onChange={(option: any) => setEndIndicator(option)}
                placeholder={"Select Labours"}
              />
            </div>
          </section>
          <div className={`my-[3%] flex justify-end`}>
            <Button type="submit" bg={`#6BBBE9`} color={'white'} className=''>Assign Job</Button>
          </div>
        </form>
    </div>
  )
}

export default JobDynamicForm