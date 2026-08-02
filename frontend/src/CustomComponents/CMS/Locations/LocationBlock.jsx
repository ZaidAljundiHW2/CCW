import { Flex, Button } from '@chakra-ui/react'

const LocationBlock = ({
    item={}, 
    setShowEdit = () => {}, 
    setEditedObj = () => {}, 
    add=false,
    setShowAdd = () => {},
    edit=true
}) => {
  return (
    <div
        className='
            w-full
            rounded-lg
            shadow-lg
            flex
            InfoBlockWrapper
            gap-5
            md:flex-row
            flex-col
        '
    >
        
        {/* Label and Info */}
        <Flex className='gap-3 min-w-0 flex-col'>

            <h1>
                Location ID: {item.locationid}
            </h1>

            <h1>
                Location: {item.locationname}
            </h1>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Location description: {item.description}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Closed days: {item.closeddays}
                </h1>

            </div>

            {item.is24hrs ? (

                    <h1>
                        Open 24 hours: {String(item.is24hrs)}
                    </h1>

                )

                :

                (

                    <>
                        <h1>
                            Open 24 hours: {String(item.is24hrs)}
                        </h1>

                        <div className='break-words min-w-0 flex-1'>

                            <h1 className='whitespace-pre-line '>
                                Open time: {item.opentime}
                            </h1>

                        </div>

                        <div className='break-words min-w-0 flex-1'>

                            <h1 className='whitespace-pre-line '>
                                Close time: {item.closetime}
                            </h1>

                        </div>
                    </>
                )
            }

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Opening details text: {item.openingtext}
                </h1>

            </div>
            

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Parking text: {item.parking}
                </h1>

            </div>

            <div className='break-words min-w-0 flex-1'>

                <h1 className='whitespace-pre-line '>
                    Directions link: {item.directions}
                </h1>

            </div>
            
            <h1 className='editText'>Image:</h1>
            <img 
                src={item.image} 
                alt={item.locationname}
                style={{
                    height: '200px',
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    alignSelf: 'flex-start'  // <-- stops the flex-col parent from stretching it
                }}
            />            

        </Flex>

        {/* Edit button */}
        <Flex className='flex-1 justify-end gap-3'>

            {add && (
                <Button className='rounded-lg editButton' style={{background:'#4BB543'}} onClick={() => setShowAdd(true)}>
                    Add
                </Button>
            )}

            {edit && (

                <Button className='rounded-lg editButton' onClick={() => {setShowEdit(true); setEditedObj(item)}}>
                    Edit
                </Button>

            )}
            

            


        </Flex>
      
    </div>
  )
}

export default LocationBlock
