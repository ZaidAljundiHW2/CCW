import React, { useState, useMemo } from 'react'
import {
    Flex,
    Button,
    Field,
    Input,
    Span,
    Select,
    NativeSelect,
    Combobox,
    Tag,
    Wrap,
    Portal,
    useListCollection,
    createListCollection
} from '@chakra-ui/react'
import axios from 'axios'


const DAYS_OF_WEEK = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]

const generateTimeOptions = () => {
    const times = []
    for (let h = 0; h < 24; h++) {
        for (const m of [0, 30]) {
            const hh = String(h).padStart(2, '0')
            const mm = String(m).padStart(2, '0')
            times.push(`${hh}:${mm}:00`)
        }
    }
    return times
}

const formatTimeLabel = (time) => time.slice(0, 5)

const TIME_OPTIONS = generateTimeOptions()

const EditLocation = ({ item, setShowEdit }) => {

    const API = import.meta.env.VITE_API_URL;


    const [openingtext, setOpeningtext] = useState(item.openingtext || "");
    const [isOpeningtextError, setIsOpeningtextError] = useState(false);
    const [openingtextErrorMessage, setOpeningtextErrorMessage] = useState("");

    // Location name
    const [name, setName] = useState(item.locationname)
    const [isNameError, setIsNameError] = useState(false)
    const [nameErrorMessage, setNameErrorMessage] = useState("")

    // Closed days (postgres array -> JS array, e.g. ["Monday"])
    const [closedDays, setClosedDays] = useState(item.closeddays || [])

    const [imgErrorMessage, setImgErrorMessage] = useState("");

    // Is 24 hours
    const [is24hrs, setIs24hrs] = useState(item.is24hrs ? "yes" : "no")

    // Open / close time (stored as "HH:MM:SS" to match DB)
    const [openTime, setOpenTime] = useState(item.opentime)
    const [closeTime, setCloseTime] = useState(item.closetime)

    // Directions link
    const [directionsLink, setDirectionsLink] = useState(item.directions)
    const [isDirectionsError, setIsDirectionsError] = useState(false)
    const [directionsErrorMessage, setDirectionsErrorMessage] = useState("")

    const [parking, setParking] = useState(item.parking);
    const [isParkingError, setIsParkingError] = useState(false);
    const [parkingErrorMessage, setParkingErrorMessage] = useState("");

    const [locationImage, setLocationImage] = useState(null);
    const [isLocationImageError, setIsLocationImageError] = useState(false);

    // --- Closed days: only offer days not already selected ---
    const availableDays = useMemo(
        () => DAYS_OF_WEEK.filter((day) => !closedDays.includes(day)),
        [closedDays]
    )

    const { collection: daysCollection } = useListCollection({
        initialItems: availableDays,
    })

    const handleClosedDaysChange = (details) => {
        setClosedDays(details.value)
    }

    const removeClosedDay = (day) => {
        setClosedDays((prev) => prev.filter((d) => d !== day))
    }

    // --- Open / close time collections ---
    const timeCollection = createListCollection({
        items: TIME_OPTIONS,
        itemToString: (time) => formatTimeLabel(time),
        itemToValue: (time) => time,
    });

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState({});

    const [isFileChosen, setIsFileChosen] = useState(false);
    const [fileImg, setFileImg] = useState();

    const handleSelectFile = (e) => {
        const selected = e.target.files[0];
        if (fileImg) URL.revokeObjectURL(fileImg);
        setFile(selected);
        setIsFileChosen(true);
        setFileImg(URL.createObjectURL(selected));
    };

    const handleUpload = async (itemid, currImgURL) => {
        try {
        setLoading(true);
        const data = new FormData();
        data.append("my_file", file);
        data.append("curr_image", currImgURL);
        const res = await axios.put(API + `/admin/CMS/locations/update-image/${itemid}`, data);
        setRes(res.data);
        } catch (error) {
        alert(error.message);
        } finally {
        setLoading(false);
        }
    };

    const updateLocation = async() => {

        try {

            let end = false;

            if (name.trim().length == 0) {

                setIsNameError(true);
                setNameErrorMessage("Input a value");
                end = true

            }

            else {
                setIsNameError(false);
                setNameErrorMessage("");
            }

            if (directionsLink.trim().length == 0) {
                setIsDirectionsError(true);
                setDirectionsErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsDirectionsError(false);
                setDirectionsErrorMessage("");
            }

            if (openingtext.trim().length == 0) {
                setIsOpeningtextError(true);
                setOpeningtextErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsOpeningtextError(false);
                setOpeningtextErrorMessage("");
            }

            if (end == true) {
                return;
            }


            

            const locationid = item.locationid;

            const body = {
                "locationname": name,
                "closeddays": closedDays,
                "is24hrs": is24hrs === "yes",
                "opentime": is24hrs === "yes" ? null : openTime,
                "closetime": is24hrs === "yes" ? null : closeTime,
                "directions": directionsLink,
                "openingtext": openingtext,
                "parking": parking,
                "image": item.image
            };

            const response = await fetch(API + `/admin/CMS/locations/update/${locationid}`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (file !== null) {
                await handleUpload(locationid, item.image);
            }

            if (response.ok) {
                setShowEdit(false);
            }


            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            className='
                bg-black/70
                fixed
                inset-0
            '
        >
            <Flex
                className='
                    absolute
                    top-[50%]
                    left-[50%]
                    rounded-lg
                    shadow-lg
                    GDWrapper
                    bg-white
                    flex-col
                    text-center
                    gap-3
                    max-h-[50%]
                    min-w-[50%]
                '

                style={{
                    transform: 'translate(-50%,-50%)',
                    overflowY: 'scroll'
                }}
            >

                <h1 className='CMSHead'>
                    Edit Location
                </h1>

                <h1 className='editText'>
                    {item.locationname}
                </h1>

                <h1 className='editText'>
                    Location ID: {item.locationid}
                </h1>

                <form className='w-full flex gap-5 flex-col'>

                    {/* Location Name */}
                    <Field.Root invalid={isNameError} className='w-full' required>
                        <Field.Label className='editText'>Location <Field.RequiredIndicator /></Field.Label>

                        <div className="relative w-full">
                            <Input
                                value={name}
                                onChange={(e) => setName(e.currentTarget.value.slice(0, 100))}
                                placeholder="New name"
                                style={{ color: 'black', paddingRight: '4.5rem' }}
                                maxLength={100}
                                className="w-full"
                            />
                            <Span
                                color="fg.muted"
                                textStyle="xs"
                                className="absolute right-3 top-1/2"
                                style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                            >
                                {name.length}/100
                            </Span>
                        </div>

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {nameErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>

                    {/* Closed Days */}
                    <Field.Root className='w-full'>
                        <Field.Label className='editText'>Closed Days</Field.Label>
                        <h1 className='editText'>For reservation form programming only.</h1>
                        <Combobox.Root
                            multiple
                            value={closedDays}
                            onValueChange={handleClosedDaysChange}
                            collection={daysCollection}
                            openOnClick
                        >
                            <Combobox.Control>
                                <Combobox.Input placeholder="Select closed days..." style={{ color: 'black' }} />
                                <Combobox.IndicatorGroup>
                                    <Combobox.ClearTrigger />
                                    <Combobox.Trigger />
                                </Combobox.IndicatorGroup>
                            </Combobox.Control>

                            <Portal>
                                <Combobox.Positioner>
                                    <Combobox.Content>
                                        <Combobox.Empty>No days available</Combobox.Empty>
                                        {availableDays.map((day) => (
                                            <Combobox.Item key={day} item={day}>
                                                <Combobox.ItemText>{day}</Combobox.ItemText>
                                                <Combobox.ItemIndicator />
                                            </Combobox.Item>
                                        ))}
                                    </Combobox.Content>
                                </Combobox.Positioner>
                            </Portal>
                        </Combobox.Root>

                        <Wrap gap="2" mt="2">
                            {closedDays.map((day) => (
                                <Tag.Root key={day} size="md" colorPalette="blue">
                                    <Tag.Label>{day}</Tag.Label>
                                    <Tag.EndElement>
                                        <Tag.CloseTrigger onClick={() => removeClosedDay(day)} />
                                    </Tag.EndElement>
                                </Tag.Root>
                            ))}
                        </Wrap>
                    </Field.Root>

                    {/* Is 24 Hours */}
                    <Field.Root className='w-full' required>
                        <Field.Label className='editText'>Open 24 Hours? <Field.RequiredIndicator /></Field.Label>
                        <NativeSelect.Root size="sm" width="320px">
                            <NativeSelect.Field
                                value={is24hrs}
                                onChange={(e) => setIs24hrs(e.currentTarget.value)}
                                style={{ color: 'black', background:'white' }}
                            >
                                <option value="no" style={{ color: 'black', background:'white' }}>No</option>
                                <option value="yes" style={{ color: 'black', background:'white' }}>Yes</option>
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </Field.Root>

                    {is24hrs === "no" && (
                        <>
                            {/* Open Time */}
                            <Field.Root className='w-full' required>
                                <Field.Label className='editText'>Open Time <Field.RequiredIndicator /></Field.Label>
                                <h1 className='editText'>For reservation form programming only.</h1>
                                <Select.Root
                                    collection={timeCollection}
                                    value={[openTime]}
                                    size="sm"
                                    width="320px"
                                    onValueChange={(details) => setOpenTime(details.value[0])}
                                >
                                    <Select.HiddenSelect />
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText color={'black'} placeholder="Select open time" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {timeCollection.items.map((time) => (
                                                    <Select.Item item={time} key={time}>
                                                        {formatTimeLabel(time)}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                            </Field.Root>

                            {/* Close Time */}
                            <Field.Root className='w-full' required>
                                <Field.Label className='editText'>Close Time <Field.RequiredIndicator /></Field.Label>
                                <h1 className='editText'>For reservation form programming only.</h1>
                                <Select.Root
                                    collection={timeCollection}
                                    value={[closeTime]}
                                    size="sm"
                                    width="320px"
                                    onValueChange={(details) => setCloseTime(details.value[0])}
                                >
                                    <Select.HiddenSelect />
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText color={'black'} placeholder="Select close time" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {timeCollection.items.map((time) => (
                                                    <Select.Item item={time} key={time}>
                                                        {formatTimeLabel(time)}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                            </Field.Root>
                        </>
                    )}

                    {/* Opening text */}
                    <Field.Root invalid={isOpeningtextError} className='w-full' required>
                        <Field.Label className='editText'>Opening times/days text <Field.RequiredIndicator /></Field.Label>
                        <h1 className='editText'>The opening/closing time details and schedule details shown on the locations page.</h1>
                        <div className="relative w-full">
                            <Input
                                value={openingtext}
                                onChange={(e) => setOpeningtext(e.currentTarget.value.slice(0, 100))}
                                placeholder="Opening text"
                                style={{ color: 'black', paddingRight: '4.5rem' }}
                                maxLength={100}
                                className="w-full"
                            />
                            <Span
                                color="fg.muted"
                                textStyle="xs"
                                className="absolute right-3 top-1/2"
                                style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                            >
                                {openingtext.length}/100
                            </Span>
                        </div>

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {openingtextErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>

                    {/* Image */}
                    <Field.Root className='w-full' required={item.locationid ? false : true}>
                        <Field.Label className='editText'>Set new location image <Field.RequiredIndicator /></Field.Label>
                        
                            <div className="App">
                                <label htmlFor="file">
    
                                    <Button as='span' style={{color:'black', borderWidth:'2px', borderColor:'black'}}>
                                        {" "}
                                        Select File
                                    </Button>
                                    
                                </label>
                                {file && isFileChosen && <center style={{color:'black'}}> {file.name}</center>}
                                {file && isFileChosen && (
                                    <img src={fileImg}/>
                                )}
                                <input
                                    id="file"
                                    type="file"
                                    onChange={handleSelectFile}
                                    multiple={false}
                                    style={{ display: 'none' }}
                                    accept="image/png, image/jpeg" 
                                />
                        
                            </div>
    
                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {imgErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>

                    {/* Parking */}
                    <Field.Root invalid={isParkingError} className='w-full'>
                        <Field.Label className='editText'>Parking text</Field.Label>

                        <div className="relative w-full">
                            <Input
                                value={parking}
                                onChange={(e) => setParking(e.currentTarget.value.slice(0, 100))}
                                placeholder="Parking text"
                                style={{ color: 'black', paddingRight: '4.5rem' }}
                                maxLength={100}
                                className="w-full"
                            />
                            <Span
                                color="fg.muted"
                                textStyle="xs"
                                className="absolute right-3 top-1/2"
                                style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                            >
                                {parking.length}/100
                            </Span>
                        </div>

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {parkingErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>

                    {/* Directions Link */}
                    <Field.Root invalid={isDirectionsError} className='w-full' required>
                        <Field.Label className='editText'>Directions Link <Field.RequiredIndicator /></Field.Label>

                        <div className="relative w-full">
                            <Input
                                value={directionsLink}
                                onChange={(e) => setDirectionsLink(e.currentTarget.value.slice(0, 100))}
                                placeholder="New directions link"
                                style={{ color: 'black', paddingRight: '4.5rem' }}
                                maxLength={100}
                                className="w-full"
                            />
                            <Span
                                color="fg.muted"
                                textStyle="xs"
                                className="absolute right-3 top-1/2"
                                style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                            >
                                {directionsLink.length}/100
                            </Span>
                        </div>

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {directionsErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>

                </form>

                <Flex className='justify-end gap-3'>

                    <Button className='editButton' onClick={() => updateLocation()}>
                        Update
                    </Button>

                    <Button className='editButton' style={{ background: 'red' }} onClick={() => setShowEdit(false)}>
                        Cancel
                    </Button>
                </Flex>

            </Flex>

        </div>
    )
}

export default EditLocation