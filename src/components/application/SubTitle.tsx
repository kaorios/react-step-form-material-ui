import Typography, {TypographyProps} from '@material-ui/core/Typography/Typography';
import * as React from 'react';

interface Props extends TypographyProps {
  text: string;
}

const SubTitle = (props: Props) => {
  const {text} = props;
  return (
      <Typography component="h2" variant="subtitle1" gutterBottom
                  style={{padding: '0 0 1em', textTransform: 'capitalize', fontWeight: 'bold'}}>
        {text}
      </Typography>
  );
};

export default SubTitle;
