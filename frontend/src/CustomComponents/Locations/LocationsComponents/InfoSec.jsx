import { Icon } from '@chakra-ui/react'
import './InfoSec.css'
import { motion } from 'motion/react'

const InfoSec = ({icon: IconComponent, index, text}) => {
    console.log(index);
  return (
    <motion.div className='w-full flex gap-5 items-center'

        initial={{opacity:0, y:-50}}

        whileInView={{opacity:1, y:0}}

        transition={{duration:.5, ease:'easeOut', delay:index*.2}}

        

    >

        
        <Icon as={IconComponent} boxSize="30px" color="#ef571b" />

        <div
            className='
                flex-1
                items-center
                flex
            '
        >

            <p className='IST'>
                {text}
            </p>

        </div>




    </motion.div>
  )
}

export default InfoSec