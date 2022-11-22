import tw from 'twin.macro';

const Root = tw.footer`fixed z-10 left-0 right-0 bottom-[env(safe-area-inset-bottom)] w-full p-4`;

const FloatingFooter = Object.assign(Root, {});

export default FloatingFooter;
