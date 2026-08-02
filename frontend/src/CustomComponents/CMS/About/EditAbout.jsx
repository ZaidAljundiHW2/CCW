import { Flex, Field, Textarea, Span, Button } from '@chakra-ui/react'
import { useState } from 'react'


const EditAbout = ({aboutitem, SetShowAboutEdit}) => {

    const [content, setContent] = useState(aboutitem.aboutcontent);
    const [isContentError, setIsContentError] = useState(false);
    const [contentErrorMessage, setContentErrorMessage]  = useState("");

    const [buttonLoading, setButtonLoading] = useState(false);


    const updateAboutContent = async(aboutitem, aboutcontent) => {

        try {

            setButtonLoading(true);

            if (aboutcontent.trim().length == 0) {

                setIsContentError(true)
                setContentErrorMessage("Enter a value");
                setButtonLoading(false);
                return;
            }

            const body = {
                "content":aboutcontent
            }

            const response = await fetch( `${import.meta.env.VITE_API_URL}/admin/CMS/about/${aboutitem.aboutid}`, {

                method:"PUT",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                SetShowAboutEdit(false);
            } else {
                setIsContentError(true);
                setContentErrorMessage("Something went wrong. Please try again.");
            }

            
        } catch (error) {

            console.error(error);
            setIsContentError(true);
            setContentErrorMessage("Something went wrong. Please try again.");

        } finally {
            setButtonLoading(false);
        }
    }

  return (
    <div
        className='
            fixed
            inset-0
            bg-black/70
            z-40
        '
    >

        <Flex
            className='
                absolute
                top-[50%]
                left-[50%]
                w-[50%]
                
                rounded-lg
                shadow-lg
                flex-col
                GDWrapper
                bg-white
                justify-center
                
            '

            style={{
                transform:'translate(-50%,-50%)'
            }}
        >

            <h1>
                {aboutitem.aboutsection}
            </h1>

            {/* Description */}
            <Field.Root className='w-full' invalid={isContentError}>
                <Field.Label className='editText'>Item Description</Field.Label>
                
                <div className="relative w-full">
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.currentTarget.value.slice(0, 800))}
                        placeholder="New description"
                        style={{ color: 'black', paddingRight: '4.5rem' }}
                        maxLength={800}
                        className="w-full h-50"
                    />
                    <Span
                        color="fg.muted"
                        textStyle="xs"
                        className="absolute bottom-0 right-9"
                        style={{ transform: 'translateY(-50%)', width: '3.5rem', textAlign: 'right' }}
                    >
                        {content.length}/800
                    </Span>
                </div>

                <Field.ErrorText width="full">
                    <Field.ErrorIcon />
                    {contentErrorMessage}
                </Field.ErrorText>
            </Field.Root>

            <Flex className='justify-end gap-5'>

                <Button className='editButton' style={{background:'red'}} onClick={() => SetShowAboutEdit(false)}>
                    Cancel
                </Button>

                <Button className='editButton' loading={buttonLoading} onClick={() => updateAboutContent(aboutitem, content)}>
                    Update
                </Button>
            </Flex>


        </Flex>
      
    </div>
  )
}

export default EditAbout
