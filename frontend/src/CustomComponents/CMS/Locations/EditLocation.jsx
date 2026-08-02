import { useState, useMemo } from 'react'
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
import DeleteLocation from './DeleteLocation'

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

    const [openingtext, setOpeningtext] = useState(item.openingtext || "");
    const [isOpeningtextError, setIsOpeningtextError] = useState(false);
    const [openingtextErrorMessage, setOpeningtextErrorMessage] = useState("");

    // Location name
    const [name, setName] = useState(item.locationname)
    const [isNameError, setIsNameError] = useState(false)
    const [nameErrorMessage, setNameErrorMessage] = useState("")

    // Address
    const [address, setAddress] = useState(item.address || "")
    const [isAddressError, setIsAddressError] = useState(false)
    const [addressErrorMessage, setAddressErrorMessage] = useState("")

    // Closed days (postgres array -> JS array, e.g. ["Monday"])
    const [closedDays, setClosedDays] = useState(item.closeddays || [])

    // Is 24 hours (boolean)
    const [is24hrs, setIs24hrs] = useState(!!item.is24hrs)

    // Open / close time (stored as "HH:MM:SS" to match DB) — prefilled from item
    const [openTime, setOpenTime] = useState(item.opentime || "");
    const [isOpenTimeError, setIsOpenTimeError] = useState(false);
    const [openTimeErrorMessage, setOpenTimeErrorMessage] = useState("");

    const [closeTime, setCloseTime] = useState(item.closetime || "")
    const [isCloseTimeError, setIsCloseTimeError] = useState(false);
    const [closeTimeErrorMessage, setCloseTimeErrorMessage] = useState("");

    // Directions link
    const [directionsLink, setDirectionsLink] = useState(item.directions)
    const [isDirectionsError, setIsDirectionsError] = useState(false)
    const [directionsErrorMessage, setDirectionsErrorMessage] = useState("")

    // Phone Number
    const [phoneNumber, setPhoneNumber] = useState(item.phonenumber || "")
    const [isPhoneNumberError, setIsPhoneNumberError] = useState(false)
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("")

    const [parking, setParking] = useState(item.parking);

    const [description, setDescription] = useState(item.description || "");

    const [isButtonLoading, setIsButtonLoading] = useState(false);

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
   

    const [isFileChosen, setIsFileChosen] = useState(false);
    const [fileImg, setFileImg] = useState();

    const [showDelete, setShowDelete] = useState(false);

    const handleSelectFile = (e) => {
        const selected = e.target.files[0];
        if (fileImg) URL.revokeObjectURL(fileImg);
        setFile(selected);
        setIsFileChosen(true);
        setFileImg(URL.createObjectURL(selected));
    };

    const handleUpload = async (itemid, currImgURL) => {
        try {
        const data = new FormData();
        data.append("my_file", file);
        data.append("curr_image", currImgURL);
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/admin/CMS/locations/update-image/${itemid}`, data, { withCredentials: true });
        } catch (error) {
        alert(error.message);
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

            if (phoneNumber.trim().length == 0) {
                setIsPhoneNumberError(true);
                setPhoneNumberErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsPhoneNumberError(false);
                setPhoneNumberErrorMessage("");
            }

            if (address.trim().length == 0) {
                setIsAddressError(true);
                setAddressErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsAddressError(false);
                setAddressErrorMessage("");
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

            if (!is24hrs && openTime.trim().length === 0) {
                setIsOpenTimeError(true);
                setOpenTimeErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsOpenTimeError(false);
                setOpenTimeErrorMessage("");
            }

            if (!is24hrs && closeTime.trim().length === 0) {
                setIsCloseTimeError(true);
                setCloseTimeErrorMessage("Input a value");
                end = true;
            }

            else {
                setIsCloseTimeError(false);
                setCloseTimeErrorMessage("");
            }

            if (end == true) {
                setIsButtonLoading(false);
                return;
            }


            

            const locationid = item.locationid;

            const body = {
                "locationname": name,
                "address": address,
                "phonenumber": phoneNumber,
                "closeddays": closedDays,
                "is24hrs": is24hrs,
                "opentime": is24hrs ? null : openTime,
                "closetime": is24hrs ? null : closeTime,
                "directions": directionsLink,
                "openingtext": openingtext,
                "parking": parking,
                "image": item.image,
                "description": description
            };

            setIsButtonLoading(true);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/locations/update/${locationid}`, {
                method:"PUT",
                credentials:'include',
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
        } finally {
            setIsButtonLoading(false);
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
                                placeholder="Name"
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

                    {/* Address */}
                    <Field.Root invalid={isAddressError} className='w-full' required>
                        <Field.Label className='editText'>Address <Field.RequiredIndicator /></Field.Label>

                        <div className="relative w-full">
                            <Input
                                value={address}
                                onChange={(e) => setAddress(e.currentTarget.value)}
                                placeholder="Address"
                                style={{ color: 'black' }}
                                className="w-full"
                            />
                        </div>

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {addressErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>

                    {/* Phone Number */}
                    <Field.Root invalid={isPhoneNumberError} className='w-full' required>
                        <Field.Label className='editText'>Phone Number <Field.RequiredIndicator /></Field.Label>

                        <div className="relative w-full">
                            <Input
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                                placeholder="Phone number"
                                style={{ color: 'black' }}
                                className="w-full"
                            />
                        </div>

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {phoneNumberErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>

                    {/* Description */}
                    <Field.Root className='w-full'>
                        <Field.Label className='editText'>Description</Field.Label>

                        <div className="relative w-full">
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.currentTarget.value.slice(0, 255))}
                                placeholder="Description"
                                style={{ color: 'black', paddingRight: '4.5rem' }}
                                maxLength={255}
                                className="w-full"
                            />
                            <Span
                                color="fg.muted"
                                textStyle="xs"
                                className="absolute right-3 top-1/2"
                                style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                            >
                                {description.length}/255
                            </Span>
                        </div>

                        
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
                                value={is24hrs ? "yes" : "no"}
                                onChange={(e) => setIs24hrs(e.currentTarget.value === "yes")}
                                style={{ color: 'black', background:'white' }}
                            >
                                <option value="no" style={{ color: 'black', background:'white' }}>No</option>
                                <option value="yes" style={{ color: 'black', background:'white' }}>Yes</option>
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </Field.Root>

                    {!is24hrs && (
                        <>
                            {/* Open Time */}
                            <Field.Root className='w-full' required invalid={isOpenTimeError}>
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

                                <Field.ErrorText width="full">
                                    <Field.ErrorIcon />
                                    {openTimeErrorMessage}
                                </Field.ErrorText>
                            </Field.Root>

                            {/* Close Time */}
                            <Field.Root className='w-full' required invalid={isCloseTimeError}>
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

                                <Field.ErrorText width="full">
                                    <Field.ErrorIcon />
                                    {closeTimeErrorMessage}
                                </Field.ErrorText>
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
                                    accept="image/*" 
                                />
                        
                            </div>
    
                       
                    </Field.Root>

                    {/* Parking */}
                    <Field.Root className='w-full'>
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

                        
                    </Field.Root>

                    {/* Directions Link */}
                    <Field.Root invalid={isDirectionsError} className='w-full' required>
                        <Field.Label className='editText'>Directions Link <Field.RequiredIndicator /></Field.Label>

                        <div className="relative w-full">
                            <Input
                                value={directionsLink}
                                onChange={(e) => setDirectionsLink(e.currentTarget.value)}
                                placeholder="New directions link"
                                style={{ color: 'black', paddingRight: '4.5rem' }}
                                className="w-full"
                            />
                            
                        </div>

                        <Field.ErrorText width="full">
                            <Field.ErrorIcon />
                            {directionsErrorMessage}
                        </Field.ErrorText>
                    </Field.Root>

                </form>

                <Flex className='justify-end gap-3'>

                    <Button className='editButton' loading={isButtonLoading} onClick={() => updateLocation()}>
                        Update
                    </Button>
                    
                    <Button className='editButton' disabled={item.ismainbranch} style={{ background: 'red' }} onClick={() => setShowDelete(true)}>
                        Delete
                    </Button>
                    
                </Flex>

                <Button className='editButton' style={{ background: 'red', alignSelf:'end' }} onClick={() => setShowEdit(false)}>
                    Cancel
                </Button>

            </Flex>

            {showDelete && (<DeleteLocation setShowDelete={setShowDelete} setShowEdit={setShowEdit} item={item}/>)}

        </div>
    )
}

export default EditLocation