import AppText from '@components/atoms/AppText';
import {rpFont} from '@helpers/responsive-utils';
import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  TextStyle,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native';


interface ReadMoreTextProps {
  readMoreStyle?: TextStyle;
  text: string;
  textStyle?: TextStyle;
  numberOfLines?: number;
}

const SeeMoreText: React.FC<ReadMoreTextProps> = ({
  readMoreStyle,
  text,
  textStyle,
  numberOfLines = 3,
}: ReadMoreTextProps) => {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState<number | undefined>(numberOfLines);

  const toggleTextShown = () => {
    setTextShown(prev => !prev);
  };

  useEffect(() => {
    setNumLines(textShown ? undefined : numberOfLines);
  }, [textShown, numberOfLines]); // Fix dependency

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (e.nativeEvent.lines.length >= numberOfLines) {
        setShowMoreButton(true);
        setNumLines(numberOfLines);
      }
    },
    [numberOfLines] // Ensure callback updates correctly
  );
  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : numLines}
        style={textStyle}
        ellipsizeMode="tail">
        {text}
      </Text>
      {showMoreButton && (
        <AppText
          onPress={toggleTextShown}
          style={readMoreStyle}
          text={textShown ? 'See less' : 'See more'}
          fontSize={rpFont(12)}
        />
      )}
    </>
  );
};

export default SeeMoreText;
