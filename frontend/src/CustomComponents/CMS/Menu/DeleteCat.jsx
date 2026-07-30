import React from 'react'
import { Flex, Button } from '@chakra-ui/react'

const DeleteCat = ({item, setShowDelete, categories, setShowEdit}) => {


  const deleteCloudinaryFolder = async(catname) => {

    try {

        const safeCat = catname.trim().toLowerCase().replace(/[^a-zA-Z0-9_-]/g, "_");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/edit/menu/category/folder/${safeCat}`, {
          method:"DELETE",
          credentials:'include',

        });

        console.log(response);

      
    } catch (error) {
      console.error(error);
    }
  }

  const deleteCat = async(category, categories) => {
    
    try {

      let output = categories;
    
      for (let i = categories.findIndex(item => item.category === category.category) + 1; i < categories.length; i++) {

          
        output[i].displayorder-=1;
      }

      //reorder
      for (const item of output) {

        const body = {
            newName: item.category,
            newRank: item.displayorder,
        };


        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/menu/menu-categories/${item.categoryid}`, {

            method:"PUT",
            credentials:'include',
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify(body)

        });

        

        console.log(response);
      }


      //API category menu items DELETE
      const deleteItems = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/menu/menu-categoryitems/${category.categoryid}`, {

        method:"DELETE",
        credentials:'include',

      })

      //API category DELETE 
      const deleteCat = await fetch(`${import.meta.env.VITE_API_URL}/admin/CMS/menu/menu-categories/${category.categoryid}`, {

        method:"DELETE",
        credentials:'include',
      });

      await deleteCloudinaryFolder(category.category);

      console.log(deleteItems);
      console.log(deleteCat);

      

      setShowEdit(false);
      


      
    } catch (error) {

      console.error(error);
      
    }
    
  }


  return (
    <div
      className='
        fixed
        inset-0
        bg-black/70
      '
    >

      <Flex
        className='
          absolute
          top-[50%]
          left-[50%]
          w-[50%]
          portrait:w-[90%]
          rounded-lg
          shadow-lg
          GDWrapper
          bg-white
          justify-center
          flex-col
          text-center
          gap-3
        '

        style={{

          transform:'translate(-50%,-50%)'
        }}
      >

        <h1 className='CMSHead' style={{lineHeight:1}}>
          Are you sure you want to delete the following section?
        </h1>

        <h1 className='editText'>
          {item.category}
        </h1>

        <h1 className='editText'>
          Deleting this category will delete all of its associated menu items.
        </h1>

        <Flex className='w-full gap-5 justify-center'>

          

          <Button className='editButton' style={{background:'red'}} onClick={() => setShowDelete(false)}>

            No

          </Button>

          <Button className='editButton' style={{background:'#4BB543'}} onClick={() => deleteCat(item, categories)}>

            Yes

          </Button>

        </Flex>


      </Flex>
      
    </div>
  )
}

export default DeleteCat
