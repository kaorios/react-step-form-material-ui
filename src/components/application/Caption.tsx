import Typography, {TypographyProps} from '@material-ui/core/Typography/Typography';
import * as React from 'react';

interface Props extends TypographyProps {
  text: string;
}

const Caption = (props: Props) => {
  const {text} = props;
  return (
      <Typography component="p" variant="body2" gutterBottom style={{padding: '1em 0'}}>
        {text}
      </Typography>
  );
};

export default Caption;
