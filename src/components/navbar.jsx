import { Button, Flex } from 'antd';
import ContainerWrapper from './container-wrapper';

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-blue-950/70 py-3.5'>
      <ContainerWrapper>
        <Flex align='center' justify='space-between' className=''>
          <h1 className='[font-family:monospace] text-xl'>
            Lingua<span className='text-orange-400 italic'>AI</span>
          </h1>
          {/* <Button>Clear Chat</Button> */}
        </Flex>
      </ContainerWrapper>
    </nav>
  );
};

export default Navbar;
