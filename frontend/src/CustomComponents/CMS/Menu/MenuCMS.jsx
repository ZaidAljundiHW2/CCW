import React, { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { useState, useRef } from 'react'
import InfoBlock from '../InfoBlock'
import MenuShowcase from '@/CustomComponents/Menu/MenuComponents/MenuShowcase'
import CatEditPopup from './CatEditPopup'
import AddCat from './AddCat'
import ToggleBYO from './ToggleBYO'
import EditMenuItem from './EditMenuItem'

const MenuCMS = () => {
    
    const API = 'http://localhost:5000'

    const [categoriesList, setCategoriesList] = useState([]);
    const [catString, setCatString] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [catObject, setCatObject] = useState();
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const [showMenuItemEdit, setShowMenuItemEdit] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState();
    const [editedObj, setEditedObj] = useState();

    const getCategories = async () => {

        try {
            
            const response = await fetch(API + '/menu/menu-categories', {

                method:"GET",
                headers: {
                    Host: "captainscrab",
                    Accept: "applications/json"
                    
                }
            })

            const jsonData = await response.json();
            const cat = jsonData.map(item => item.category);

            let str = "";

            for (const category of cat) {

                if (cat.indexOf(category) + 1 == cat.length) {
                    str = str + " " + category;
                    break;
                }
                str = str + " " + category + ",";
            }

            
            setCategoriesList(cat);
            setCatObject(jsonData);
            setCatString(str);
            

        } catch (error) {

            console.error(error);
            
        }
    }

    

    useEffect(() => {

        const load = async () => {

            setIsLoading(true);
            await getCategories();
            setIsLoading(false);
        };

        load();


    }, [showEdit, showAdd, showToggle]);


  return (
    <div
        className='
            w-full
            h-full
            GDWrapperC
            flex
            flex-col
            bg-white
        '
    >

        <h1 className='CMSHead'>Menu</h1>

        {/* Menu Categories */}
        <Flex 
            className='
                GDWrapper 
                rounded-lg 
                shadow-lg
                flex-col
                
            '
        >

            <h1 className='CMSHead'>
                Menu Categories
            </h1>

            {(

                isLoading ? (
                    <p style={{color:'black'}}>Loading...</p>
                )

                :

                (
                    <InfoBlock 
                        label={'Menu Categories'} 
                        val={catString}
                        setShowEdit={setShowEdit}
                        setShowAdd={setShowAdd}
                        add={true}
                    />
                )

            )}


            {(

                isLoading ? (
                    <p style={{color:'black'}}>Loading...</p>
                )

                :

                (
                    <InfoBlock 
                        label={'Build Your Own'} 
                        val={
                            
                            categoriesList.includes("Build Your Own") ?
                                "Enabled" :
                                "Disabled"
                        }
                        setShowEdit={setShowToggle}
                    />
                )

            )}
            

        </Flex>

        <h1 className='CMSHead'>Menu Items</h1>
        
        {/* Menu Items */}
        <Flex 
            className='
                GDWrapper 
                rounded-lg 
                shadow-lg
                flex-col
                
            '
        >

            <InfoBlock 
                label={'Menu Items'} 
                
            />

            <MenuShowcase edit={true} setSelectedMenuItem={setSelectedMenuItem} setShowMenuItemEdit={setShowMenuItemEdit}/>


        </Flex>

        {!isLoading && showEdit && (<CatEditPopup cats={categoriesList} setShowEdit={setShowEdit} catItem={catObject}/>)}
        
        {!isLoading && showAdd && (<AddCat setShowAdd={setShowAdd} categories={catObject}/>)}

        {!isLoading && showToggle && (<ToggleBYO cats={categoriesList} setShowToggle={setShowToggle} categories={catObject}/>)}

        {!isLoading && showMenuItemEdit && (<EditMenuItem setShowMenuItemEdit={setShowMenuItemEdit} menuitem={selectedMenuItem} />)}

      
    </div>
  )
}

export default MenuCMS
