'use client';

import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { shortURL } from '@/actions/shortURL';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <span className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Shortening URL...
        </span>
      ) : (
        <span>Shorten URL</span>
      )}
    </Button>
  );
}

export function SForm() {
  const [shortenedURLState, setShortenedURLState] = useState('');
  const [copyToClipboardText, setCopyToClipboardText] =
    useState('Copy to clipboard');
  const [state, formAction]: any = useFormState(shortURL, {
    ok: true,
    urlShortened: '',
    msg: '',
  });

  useEffect(() => {
    setShortenedURLState(state.urlShortened);
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-4 min-w-80">
      <Label>
        <span>Your long URL</span>
        <Input
          type="url"
          name="normalURL"
          placeholder="Paste your long URL here"
          className="mt-2"
          required
        />
      </Label>

      <Label>
        <span className="flex items-center gap-2">
          <Wand2 width={20} height={20} className="opacity-70" /> sURL
        </span>
        <Input value={shortenedURLState} placeholder='Your shortened URL will be placed here' className="mt-2" disabled={shortenedURLState !== '' ? false : true} />
      </Label>

      {shortenedURLState ? (
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            navigator.clipboard.writeText(shortenedURLState);

            setCopyToClipboardText('Copied!');
            setTimeout(() => {
              setCopyToClipboardText('Copy to Clipboard');
            }, 3000);
          }}
        >
          {copyToClipboardText}
        </Button>
      ) : null}

      <SubmitButton />
    </form>
  );
}
