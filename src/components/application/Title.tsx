import Typography, {TypographyProps} from '@material-ui/core/Typography/Typography';
import * as React from 'react';

interface Props extends TypographyProps {
  text: string;
}

const Title = (props: Props) => {
  const {text} = props;
  return (
      <Typography component="h1" variant="h6" gutterBottom style={{textTransform: 'capitalize', color: '#2196f3'}}>
        {text}
      </Typography>
  );
};

export default Title;
