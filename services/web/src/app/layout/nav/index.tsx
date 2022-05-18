import React from 'react';

import {
  Link,
  useLocation, 
  useNavigate,
} from "react-router-dom";

import {
  Avatar,
  VStack,
  HStack,
  Box,
  Spacer,
  Heading,
  IconButton,
} from '@chakra-ui/react';

import {
  IoChevronForward,
  IoChevronBack,
  IoPeopleOutline,
  IoBrowsersOutline,
  IoAlbumsOutline
} from 'react-icons/io5';

import {
  useFlash,
  useSettings,
} from '../../providers/hooks';

import Locale from '../../locale';

import Option from './option';
import UserMenu from './user';


const Component = () => {
  const navigate = useNavigate();
  const {settings, setSettings} = useSettings();
  const {setFlash} = useFlash();

  const left = settings.menuExpanded ? 0 : "54px";

  return (
    <>
      <VStack as='nav' h='full' align="flex-start" className="dashboard-nav" spacing={0} {...(settings.menuExpanded ? {width: 180} : {})}>
        {
          settings.menuExpanded
          ? <HStack spacing={0} align="center" w="full" px={4} pt={3} pb={2}>
              <Heading size="md">{Locale.branding}</Heading>
            </HStack>  
          : <Box px={2} py={2}>
              <Avatar name={Locale.branding} size="sm"/>
            </Box>
        }

        <Box w='full' h='1px' className="divider-line"/>

        <Option expanded={settings.menuExpanded} aria-label="dashboard" cursor="pointer" icon={IoBrowsersOutline} as={Link} to='/' />
        <Option expanded={settings.menuExpanded} aria-label="People" cursor="pointer" icon={IoPeopleOutline} as={Link} to='/people' />
        <Option expanded={settings.menuExpanded} aria-label="Products" cursor="pointer" icon={IoAlbumsOutline} as={Link} to='/products' />
        
        <Spacer/>

        <UserMenu expanded={settings.menuExpanded}/>
      </VStack>

      <IconButton
        p={0}
        bg='white'
        position="absolute"
        bottom={0}
        left={settings.menuExpanded ? "178px" : "50px"}
        zIndex={999}
        aria-label='Expand'
        icon={settings.menuExpanded ? <IoChevronBack/> : <IoChevronForward/>}
        size="sm"
        variant="ghost"
        className="general-border"
        borderLeftRadius={0}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        borderLeft="none"
        borderBottom="none"
        onClick={() => setSettings({...settings, menuExpanded: !settings.menuExpanded})}
      />      

    </>
  );
}

export default Component;
