import axios from 'axios';
import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import Input from '../../../components/Input';
import LoadingScreen from '../../../components/LoadingScreen';
import './styles/storeSettingsPage.css';

const NotificationForm = () => {
  const submitHandler = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <fieldset className="form__field">test</fieldset>

      <button className="form__btn form__btn--submit" type="button">
        Update
      </button>
    </form>
  );
};

const DetailsForm = ({
  storeId,
  name,
  location,
  phone,
  tags,
  headerImage,
  iconImage,
}: {
  storeId: string | undefined;
  name: string;
  location: string;
  phone: string;
  tags: string;
  headerImage: string;
  iconImage: string;
}) => {
  const headerRef = React.useRef<HTMLInputElement>(null);
  const iconRef = React.useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [inputHeader, setHeader] = React.useState<string | null>(null);
  const [inputIcon, setIcon] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {},
  );

  const { isLoading: isUpdating, mutate } = useMutation(
    async ({
      inputName,
      inputLocation,
      inputPhone,
      inputTags,
    }: {
      inputName: string;
      inputLocation: string;
      inputPhone: string;
      inputTags: string;
    }) => {
      const params: any = {};
      if (inputName !== name) params.name = inputName;
      if (inputLocation !== location) params.location = inputLocation;
      if (inputPhone !== phone) params.phone = inputPhone;
      if (inputTags !== tags) params.tags = inputTags;

      const res = await axios.post(`/store/${storeId}/update`, params);

      return res.data;
    },
    {
      onSuccess: (updatedDate: any) => {
        queryClient.setQueryData('/dashboard/store/settings', updatedDate);
      },
      onError: (error: any) => {
        if (error.response && error.response.status === 400) {
          setFieldErrors(error.response.data.errors);
        } else {
          setFieldErrors({
            general: 'An error occurred during request, please try again.',
          });
        }
        return error;
      },
    },
  );

  const { mutate: mutateImages } = useMutation(
    async ({
      removeHeader,
      removeIcon,
      header,
      icon,
    }: {
      header?: string;
      icon?: string;
      removeIcon?: boolean;
      removeHeader?: boolean;
    }) => {
      const res = await axios.post(`/store/${storeId}/update/image`, {
        removeHeader,
        removeIcon,
        header,
        icon,
      });

      return res.data;
    },
  );

  function uploadHandler(evt: React.SyntheticEvent<HTMLFormElement>) {
    evt.preventDefault();
    setFieldErrors({});

    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());
    mutateImages(fields);
  }

  function removeHandler(evt: React.SyntheticEvent<HTMLButtonElement>) {
    evt.preventDefault();
    setFieldErrors({});

    const data =
      evt.currentTarget.name === 'header'
        ? { removeHeader: true }
        : { removeIcon: true };
    mutateImages(data);
  }

  function submitHandler(evt: React.SyntheticEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());
    mutate(fields);
  }

  function isValidFile() {
    return true;
  }

  function onFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    if (!evt.target || evt.target.files?.length === 0) return;
    if (!evt.target.files?.item(0)) return;

    if (isValidFile()) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (evt.target.name === 'icon') {
          setIcon(e.target?.result as string);
        } else {
          setHeader(e.target?.result as string);
        }
      };
      fileReader.readAsDataURL(evt.target.files[0] as File);
    }
  }

  return (
    <>
      <form onSubmit={uploadHandler}>
        <fieldset className="form__field">
          <label className="form__label" htmlFor="header">
            <span className="form__labeling">Store Header</span>

            <button
              className="form__btn form__btn--upload"
              type="button"
              onClick={(evt) => {
                evt.preventDefault();
                if (headerRef.current) headerRef.current.click();
              }}
            >
              <img
                className="form__preview"
                alt="Store Header"
                src={inputHeader || headerImage}
              />

              <span className="form__preview-text">Change Header Image</span>
            </button>

            <button
              className="form__btn"
              type="button"
              name="header"
              onClick={removeHandler}
            >
              Remove Header Image
            </button>

            <input
              id="header"
              name="header"
              type="file"
              ref={headerRef}
              onChange={onFileChange}
              className="form__input form__input--file"
            />
          </label>

          <label className="form__label" htmlFor="icon">
            <span className="form__labeling">Store Icon</span>
            <button
              className="form__btn form__btn--upload"
              type="button"
              onClick={(evt) => {
                evt.preventDefault();
                if (iconRef.current) iconRef.current.click();
              }}
            >
              <img
                className="form__preview"
                alt="Store Icon"
                src={inputIcon || iconImage}
              />
              <span className="form__preview-text">Change Icon Image</span>
            </button>

            <button
              className="form__btn"
              type="button"
              name="icon"
              onClick={removeHandler}
            >
              Remove Icon Image
            </button>
            <input
              id="icon"
              name="icon"
              type="file"
              ref={iconRef}
              onChange={onFileChange}
              className="form__input form__input--file"
            />
          </label>
        </fieldset>
      </form>

      <form className="" onSubmit={submitHandler}>
        <fieldset className="form__field">
          <Input
            name="name"
            type="text"
            label="Store Name"
            defaultValue={name}
            error={fieldErrors.name}
          />

          <Input
            name="location"
            type="text"
            label="Address"
            defaultValue={location}
            error={fieldErrors.location}
          />

          <Input
            name="phone"
            type="text"
            label="Phone Number"
            defaultValue={phone}
            error={fieldErrors.phone}
          />

          <Input
            name="tags"
            type="text"
            label="Tags (Separated by comma)"
            defaultValue={tags}
            error={fieldErrors.tags}
          />
        </fieldset>

        <button
          className="form__btn form__btn--submit"
          type="submit"
          disabled={isUpdating}
        >
          Update Store
        </button>
      </form>
    </>
  );
};

const TimeSelect = ({
  heading,
  day,
  times,
  changeTimes,
}: {
  heading: string;
  day: number;
  times: any;
  changeTimes: any;
}) => {
  const removeTime = (index: number) =>
    times.filter((time: any, i: number) => index !== i);

  const changeTime = (
    index: number,
    type: string,
    val: string,
    setOpen = true,
  ) => {
    changeTimes(
      day,
      times.map((time: any, i: number) => {
        if (i !== index) return time;
        if (setOpen && type === 'h') return { ...time, openHour: val };
        if (setOpen && type === 'm') return { ...time, openMin: val };
        if (!setOpen && type === 'h') return { ...time, closeHour: val };
        if (!setOpen && type === 'm') return { ...time, closeMin: val };
        if (setOpen && type === 's') return { ...time, openSuffix: val };
        return { ...time, closeSuffix: val };
      }),
    );
  };

  return (
    <div className="time">
      <h3 className="time__heading">{heading}</h3>
      <ul className="time__list">
        {times.map((time: any, index: number) => (
          <li className="time__item">
            <div className="time__start">
              <select
                name={`openHour-${day}-${index}`}
                value={time.openHour}
                className="time__select"
                onChange={(evt) => changeTime(index, 'h', evt.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>

              <span className="time__colon">:</span>

              <select
                name={`openMin-${day}-${index}`}
                value={time.openMin}
                className="time__select"
                onChange={(evt) => changeTime(index, 'm', evt.target.value)}
              >
                <option value="00">00</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
              </select>

              <select
                name={`openSuffix-${day}-${index}`}
                value={time.openSuffix}
                onChange={(evt) => changeTime(index, 's', evt.target.value)}
                className="time__select"
              >
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>

            <div className="time__end">
              <select
                className="time__select"
                name={`closeHour-${day}-${index}`}
                value={time.closeHour}
                onChange={(evt) =>
                  changeTime(index, 'h', evt.target.value, false)
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>

              <span className="time__colon">:</span>

              <select
                className="time__select"
                name={`closeMin-${day}-${index}`}
                value={time.closeMin}
                onChange={(evt) =>
                  changeTime(index, 'm', evt.target.value, false)
                }
              >
                <option value="00">00</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
              </select>

              <select
                className="time__select"
                name={`closeSuffix-${day}-${index}`}
                value={time.closeSuffix}
                onChange={(evt) =>
                  changeTime(index, 's', evt.target.value, false)
                }
              >
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>

            <button
              className=""
              type="button"
              onClick={() => changeTimes(day, removeTime(index))}
            >
              Remove
            </button>
          </li>
        ))}

        <li className="time__item time__item--add">
          <button
            className="time__btn time__btn--add"
            type="button"
            onClick={() =>
              changeTimes(day, [
                ...times,
                {
                  openHour: '1',
                  openMin: '00',
                  openSuffix: 'am',
                  closeHour: '1',
                  closeMin: '00',
                  closeSuffix: 'pm',
                },
              ])
            }
          >
            +
          </button>
        </li>
      </ul>
    </div>
  );
};

const AvailabilityForm = ({
  storeId,
  initTimes,
}: {
  storeId: string | undefined;
  initTimes: Array<any>;
}) => {
  const [times, setTimes] = React.useState<
    Record<
      string,
      Array<{
        openHour: string;
        openMin: string;
        openSuffix: string;
        closeHour: string;
        closeMin: string;
        closeSuffix: string;
      }>
    >
  >({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  React.useEffect(() => {
    if (initTimes && initTimes.length > 0) {
      const newTimes: any = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
      initTimes.forEach((time: any) => {
        const openArr = time.openTime.split(':');
        const openHourInt = parseInt(openArr[0], 10);
        const closeArr = time.closeTime.split(':');
        const closeHourInt = parseInt(closeArr[0], 10);

        newTimes[time.day].push({
          openHour: openHourInt <= 12 ? openArr[0] : `${openHourInt - 12}`,
          openMin: openArr[1],
          openSuffix: openHourInt < 12 ? 'am' : 'pm',
          closeHour: closeHourInt <= 12 ? closeArr[0] : `${closeHourInt - 12}`,
          closeMin: closeArr[1],
          closeSuffix: closeHourInt < 12 ? 'am' : 'pm',
        });
      });
      setTimes(newTimes);
    }
  }, [initTimes]);

  const { mutate, isLoading } = useMutation(async (newTimes: Array<any>) => {
    const res = await axios.post(`/store/${storeId}/update/hours`, {
      times: newTimes,
    });

    return res.data;
  });

  const changeTimeByIndex = (index: number, newTimes: any) => {
    setTimes({ ...times, [index]: newTimes });
  };

  const submitHandler = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // Converts times to 24-hours
    const convertedTimes: Array<any> = [];
    Object.values(times).forEach((timeArr, dayIndex: number) => {
      timeArr.forEach((timeElem) => {
        convertedTimes.push({
          day: dayIndex,
          openTime: `${
            timeElem.openSuffix === 'am'
              ? timeElem.openHour
              : parseInt(timeElem.openHour, 10) + 12
          }:${timeElem.openMin}`,
          closeTime: `${
            timeElem.closeSuffix === 'am'
              ? timeElem.closeHour
              : parseInt(timeElem.closeHour, 10) + 12
          }:${timeElem.closeMin}`,
        });
      });
    });

    mutate(convertedTimes);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <fieldset className="form__field">
        <TimeSelect
          day={0}
          heading="Monday"
          times={times[0]}
          changeTimes={changeTimeByIndex}
        />
        <TimeSelect
          day={1}
          heading="Tuesday"
          times={times[1]}
          changeTimes={changeTimeByIndex}
        />
        <TimeSelect
          day={2}
          heading="Wednesday"
          times={times[2]}
          changeTimes={changeTimeByIndex}
        />
        <TimeSelect
          day={3}
          heading="Thrusday"
          times={times[3]}
          changeTimes={changeTimeByIndex}
        />
        <TimeSelect
          day={4}
          heading="Friday"
          times={times[4]}
          changeTimes={changeTimeByIndex}
        />
        <TimeSelect
          day={5}
          heading="Satruday"
          times={times[5]}
          changeTimes={changeTimeByIndex}
        />
        <TimeSelect
          day={6}
          heading="Sunday"
          times={times[6]}
          changeTimes={changeTimeByIndex}
        />
      </fieldset>

      <button
        className="form__btn form__btn--submit"
        type="submit"
        disabled={isLoading}
      >
        Update Hours
      </button>
    </form>
  );
};

const StoreSettingsPage = () => {
  const { storeId } = useParams();
  const [formSelection, setFormSelection] = React.useState<string>('details');

  const { isLoading, data } = useQuery(
    `/dashboard/store/${storeId}`,
    async () => {
      const res = await axios(`/dashboard/store/${storeId}`);

      return res.data;
    },
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <section className="store-settings">
      <header className="store-settings__header">
        <h4 className="store-settings__heading">Settings</h4>
      </header>

      <div className="store-settings__container">
        <aside className="store-settings__aside">
          <ul className="store-settings__list">
            <li className="store-settings__item">
              <button
                className={`store-settings__navbtn ${
                  formSelection === 'details'
                    ? 'store-settings__navbtn--active'
                    : ''
                }`}
                type="button"
                onClick={() => setFormSelection('details')}
              >
                Details
              </button>
            </li>

            <li className="store-settings__item">
              <button
                className={`store-settings__navbtn ${
                  formSelection === 'availability'
                    ? 'store-settings__navbtn--active'
                    : ''
                }`}
                type="button"
                onClick={() => setFormSelection('availability')}
              >
                Availability
              </button>
            </li>

            <li className="store-settings__item">
              <button
                className={`store-settings__navbtn ${
                  formSelection === 'notification'
                    ? 'store-settings__navbtn--active'
                    : ''
                }`}
                type="button"
                onClick={() => setFormSelection('notification')}
              >
                Notification
              </button>
            </li>
          </ul>
        </aside>

        <div className="store-settings__content">
          {formSelection === 'details' ? (
            <DetailsForm
              storeId={storeId}
              name={data.name}
              location={data.location}
              phone={data.phone}
              tags={data.tags}
              headerImage={data.headerImage}
              iconImage={data.icon}
            />
          ) : null}

          {formSelection === 'notification' ? <NotificationForm /> : null}

          {formSelection === 'availability' ? (
            <AvailabilityForm storeId={storeId} initTimes={data.openTimes} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default StoreSettingsPage;
