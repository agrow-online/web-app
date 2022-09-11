import { ComponentWithAs, Heading, HeadingProps, Text, TextProps } from '@chakra-ui/react';

export const Hero: ComponentWithAs<'h1', HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading as="h1" fontSize="28px" lineHeight="36px" fontWeight="900" {...props}>
      {children}
    </Heading>
  );
};

export const Title: ComponentWithAs<'h2', HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading as="h2" fontSize="22px" lineHeight="28px" fontWeight="600" {...props}>
      {children}
    </Heading>
  );
};

export const Headline: ComponentWithAs<'h2', HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading as="h3" fontSize="17px" lineHeight="24px" fontWeight="600" {...props}>
      {children}
    </Heading>
  );
};

export const Body: ComponentWithAs<'p', TextProps & { small?: boolean }> = ({
  small = false,
  children,
  ...props
}) => {
  return (
    <Text
      fontSize={small ? '15px' : '17px'}
      lineHeight={small ? '20px' : '28px'}
      fontWeight="400"
      {...props}
    >
      {children}
    </Text>
  );
};

export const CallToAction: ComponentWithAs<'p', TextProps & { small?: boolean }> = ({
  small = false,
  children,

  ...props
}) => {
  return (
    <Text
      fontSize={small ? '15px' : '17px'}
      lineHeight={small ? '20px' : '24px'}
      fontWeight="700"
      {...props}
    >
      {children}
    </Text>
  );
};
