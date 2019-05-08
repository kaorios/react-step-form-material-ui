import Button, {ButtonProps} from '@material-ui/core/Button';
import {LocationDescriptor} from 'history';
import React from 'react';
import {Link} from 'react-router-dom';

interface ButtonLinkProps extends ButtonProps {
  to: LocationDescriptor;
}

const ButtonLink = (props: ButtonLinkProps) => {
  const {children, to} = props;
  return (
      <Button {...props} component={({innerRef, ...linkProps}) => <Link {...linkProps} to={to}/>}>
        {children}
      </Button>
  );
};

export default ButtonLink;
