import { useEffect, useState } from 'react';
import { Map } from '../components/Map';
import { TargetDisplay } from '../components/TargetDisplay';
import styled from 'styled-components/macro';
import { availableItemsState, targetItemState, usedItemsState } from '../recoil/game';
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { sample as _sample } from 'lodash';
import { Container } from '../components/chakra/Container';
import { Paragraph } from '../components/chakra/Paragraph';
import { Box, Button } from '@chakra-ui/react';

const SectionContainer = styled.div``;

export const Home = () => {
  const [targetItem, setTargetItem] = useRecoilState(targetItemState);
  const resetTargetItem = useResetRecoilState(targetItemState);
  const setUsedItems = useSetRecoilState(usedItemsState);
  const resetUsedItems = useResetRecoilState(usedItemsState);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [isRightAnswer, setIsRightAnswer] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const availableItems = useRecoilValue(availableItemsState);

  // Set a random item on first load
  useEffect(() => {
    const randomItem = _sample(availableItems);
    if (randomItem) {
      setTargetItem(randomItem);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Deal with the selected item
  useEffect(() => {
    if (!selected) return;

    if (selected === targetItem) {
      setIsRightAnswer(true);
      setIsWrongAnswer(false);
      setUsedItems((old) => [...old, selected]);
      setSelected(undefined);
    } else {
      setIsRightAnswer(false);
      setIsWrongAnswer(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Find a new random item if possible, otherwise, end the game
  useEffect(() => {
    const randomItem = _sample(availableItems);
    if (randomItem) {
      setTargetItem(randomItem);
    } else {
      setIsGameOver(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableItems]);

  const resetGame = () => {
    resetTargetItem();
    resetUsedItems();

    const randomItem = _sample(availableItems);
    if (randomItem) {
      setTargetItem(randomItem);
    }

    setSelected(undefined);
    setIsRightAnswer(false);
    setIsWrongAnswer(false);
    setIsGameOver(false);
  };

  return (
    <SectionContainer>
      <Container py={4}>
        <TargetDisplay />
        <Box mb={4}>
          <Map onClick={(item) => setSelected(item)} />
        </Box>
        {selected && (
          <Paragraph>
            You selected: <strong>{selected}</strong>
          </Paragraph>
        )}
        {!isGameOver && (
          <>
            {isWrongAnswer && <Paragraph>🧐 Hmm that's not it. Try again.</Paragraph>}
            {isRightAnswer && <Paragraph>🎉 That's that one!</Paragraph>}
            <Paragraph>
              <Button onClick={resetGame}>Reset game</Button>
            </Paragraph>
          </>
        )}
        {isGameOver && (
          <Paragraph>
            ⭐️ Great Job, you found all the states! <Button onClick={resetGame}>Play again?</Button>
          </Paragraph>
        )}
      </Container>
    </SectionContainer>
  );
};
