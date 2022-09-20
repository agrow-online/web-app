import { Box, LinkBox, Icon, LinkOverlay } from '@chakra-ui/react';
import { HiArrowSmRight } from 'react-icons/hi';
import NextLink from 'next/link';
import { Typography } from '../../../../components/typography';
import { TileLinkProps } from './types';

export const TileLink = ({ text, href, icon, iconColor, tileColor }: TileLinkProps) => {
  return (
    <LinkBox
      as={Box}
      background={tileColor}
      border="3px solid #131723"
      borderRadius="16px"
      padding="20px"
    >
      <Icon as={icon} color={iconColor} boxSize="20px" />
      <NextLink href={href} passHref>
        <LinkOverlay>
          <Typography.CallToAction
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <span>{text}</span> <Icon as={HiArrowSmRight} />
          </Typography.CallToAction>
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  );
};
