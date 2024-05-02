import Transcriptor, { Transcription } from '../src';
import expect from 'expect';
import { test } from '@jest/globals';

test('test if transcription is retrieve', async () => {
  const transcript = await Transcriptor.getTranscript('https://www.youtube.com/watch?v=0SItu2xPx-4', ['fr'])
  const transcription = transcript as Transcription;
  expect(transcription.language).toBe('fr');
});

test('test if transcription in multiple language is retrieve', async () => {
  const transcriptions = await Transcriptor.getTranscript('https://www.youtube.com/watch?v=l-nMKJ5J3Uc', ['fr', 'en'])
  expect(transcriptions[0].language).toBe('en');
});

test('test if transcription from multiple source is retrieve', async () => {
  const transcriptions = await Transcriptor.getTranscripts(['https://www.youtube.com/watch?v=0SItu2xPx-4', 'https://www.youtube.com/watch?v=0SItu2xPx-4'], ['fr'])
  expect(transcriptions[0].language).toBe('fr');
});