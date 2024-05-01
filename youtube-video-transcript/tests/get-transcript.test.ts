import Transcriptor, { Transcription } from '../src';
import expect from 'expect';
import { test } from '@jest/globals';

test('test if transcription is retrieve', async () => {
  const transcript = await Transcriptor.getTranscript('https://www.youtube.com/watch?v=0SItu2xPx-4', ['fr'])
  const transcription = transcript as Transcription;
  expect(transcription.language).toBe('fr');
});