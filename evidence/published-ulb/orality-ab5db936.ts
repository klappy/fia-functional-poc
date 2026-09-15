/**
 * Orality Layer — transforms written text into speech-optimized text with SSML breaks.
 *
 * Written prose and spoken prose are fundamentally different modalities.
 * This utility bridges that gap by injecting natural pauses, normalizing
 * characters that confuse TTS engines, and shaping text for the ear.
 */

export interface SpeechPacingOptions {
  /** Pause after periods (seconds). Default: 0.4 */
  periodPause?: number;
  /** Pause after commas (seconds). Default: 0.3 */
  commaPause?: number;
  /** Pause around em-dashes (seconds). Default: 0.5 */
  emDashPause?: number;
  /** Pause after colons/semicolons (seconds). Default: 0.3 */
  colonPause?: number;
  /** Pause between paragraphs (seconds). Default: 0.6 */
  paragraphPause?: number;
  /** Pause after ellipses (seconds). Default: 0.5 */
  ellipsisPause?: number;
}

const DEFAULT_PACING: Required<SpeechPacingOptions> = {
  periodPause: 0.4,
  commaPause: 0.3,
  emDashPause: 0.5,
  colonPause: 0.3,
  paragraphPause: 0.6,
  ellipsisPause: 0.5,
};

/**
 * Prepare written text for TTS by injecting SSML break tags at natural
 * breath points and normalizing characters that cause TTS artifacts.
 *
 * The input text should be plain prose (no existing SSML).
 * If text already contains `<break` tags, it's returned as-is.
 */
export function prepareForSpeech(
  text: string,
  options: SpeechPacingOptions = {}
): string {
  // If already has SSML breaks, don't double-process
  if (text.includes("<break")) return text;

  const p = { ...DEFAULT_PACING, ...options };

  let result = text;

  // ── Normalize characters that confuse TTS ──────────────────────────
  // Smart quotes → straight quotes (TTS handles straight quotes better)
  result = result.replace(/[\u201C\u201D]/g, '"');
  result = result.replace(/[\u2018\u2019]/g, "'");

  // Normalize various dash characters to em-dash
  result = result.replace(/\u2014/g, "—"); // already em-dash, but normalize encoding
  result = result.replace(/\u2013/g, "—"); // en-dash → em-dash for speech

  // ── Paragraph breaks ───────────────────────────────────────────────
  if (p.paragraphPause > 0) {
    result = result.replace(
      /\n\s*\n/g,
      ` <break time="${p.paragraphPause}s"/> `
    );
  } else {
    // No SSML — use double space as a natural pause cue for the TTS engine
    result = result.replace(/\n\s*\n/g, "  ");
  }

  // Single newlines → space (TTS doesn't need line breaks)
  result = result.replace(/\n/g, " ");

  // ── Ellipses ───────────────────────────────────────────────────────
  if (p.ellipsisPause > 0) {
    result = result.replace(
      /\s*[.]{3,}\s*/g,
      ` <break time="${p.ellipsisPause}s"/> `
    );
    result = result.replace(
      /\s*\u2026\s*/g,
      ` <break time="${p.ellipsisPause}s"/> `
    );
  }

  // ── Em-dashes — dramatic beat ──────────────────────────────────────
  if (p.emDashPause > 0) {
    result = result.replace(
      /\s*—\s*/g,
      ` <break time="${p.emDashPause}s"/>— `
    );
  }

  // ── Colons and semicolons ──────────────────────────────────────────
  if (p.colonPause > 0) {
    result = result.replace(
      /([;:])\s+/g,
      `$1 <break time="${p.colonPause}s"/> `
    );
  }

  // ── Periods (sentence boundaries) ──────────────────────────────────
  if (p.periodPause > 0) {
    result = result.replace(
      /\.\s+(?=[A-Z])/g,
      `. <break time="${p.periodPause}s"/> `
    );
  }

  // ── Commas (breath points) ─────────────────────────────────────────
  if (p.commaPause > 0) {
    result = result.replace(
      /,\s+/g,
      `, <break time="${p.commaPause}s"/> `
    );
  }

  // ── Clean up double spaces ─────────────────────────────────────────
  result = result.replace(/\s{2,}/g, " ").trim();

  return result;
}

