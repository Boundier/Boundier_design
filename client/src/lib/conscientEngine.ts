import { Post } from "../data/mockPosts";
import { storage } from "./storage";

export interface InfluenceVector {
  fear: number;
  urgency: number;
  hype: number;
  authority: number;
  curiosity: number;
  visual_hype: number;
}

export interface ResponseVector {
  engagement: number;
  hesitation: number;
  fixation: number;
  clickbait_response: number;
}

export interface InteractionMetrics {
  dwellTimeMs: number;
  tapCount: number;
  scrollSpeed: "fast" | "slow" | "normal";
  clickedWithin2s: boolean;
  openCount: number;
}

export interface AnalysisResult {
  influenceVector: InfluenceVector;
  responseVector: ResponseVector;
  explanation: string;
  timestamp: number;
  postId: string;
}

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export function analyzePost(post: Post, interaction: InteractionMetrics): AnalysisResult {
  // Influence Vector Calculation
  let fear = 0;
  const lowerTitle = post.title.toLowerCase();
  
  if (["warn", "danger", "risk", "ruin", "experts warn"].some(w => lowerTitle.includes(w))) fear += 0.6;
  if (post.audioFlag.high_tension) fear += 0.2;
  if (post.thumbnail.expression === "shocked") fear += 0.2;

  let urgency = 0;
  if (["now", "today", "last", "only", "limited"].some(w => lowerTitle.includes(w))) urgency += 0.5;
  if (post.punctuationIntensity >= 1 || post.capsIntensity >= 1) urgency += 0.2;
  if (post.thumbnail.saturation > 0.7) urgency += 0.2;

  let hype = 0;
  if (post.clickbaitWords.length > 0) hype += 0.6;
  if (["you won't believe", "shocking"].some(w => lowerTitle.includes(w))) hype += 0.2;

  let authority = 0;
  if (["expert", "study", "research", "survey", "experts"].some(w => lowerTitle.includes(w))) authority += 0.5;

  let curiosity = 0;
  if (lowerTitle.includes("?") || lowerTitle.includes("...") || lowerTitle.startsWith("guess")) curiosity += 0.4;

  let visual_hype = clamp(post.thumbnail.saturation * 0.7 + (post.thumbnail.faces > 0 ? 0.1 : 0), 0, 1);

  const influenceVector: InfluenceVector = {
    fear: clamp(fear, 0, 1),
    urgency: clamp(urgency, 0, 1),
    hype: clamp(hype, 0, 1),
    authority: clamp(authority, 0, 1),
    curiosity: clamp(curiosity, 0, 1),
    visual_hype,
  };

  // Response Vector Calculation
  const engagement = clamp(interaction.dwellTimeMs / 8000, 0, 1);
  
  let hesitation = 0;
  if (interaction.dwellTimeMs < 300 && interaction.tapCount > 0) hesitation = 0.6;
  else hesitation = 0.1; // small value

  let fixation = 0;
  if (interaction.openCount > 1 || interaction.dwellTimeMs > 6000) fixation = 1;
  else fixation = clamp(interaction.dwellTimeMs / 6000, 0, 1);

  const clickbait_response = interaction.clickedWithin2s ? 1 : 0;

  const responseVector: ResponseVector = {
    engagement,
    hesitation,
    fixation,
    clickbait_response,
  };

  // Explanation Generation
  const scores = Object.entries(influenceVector).sort(([, a], [, b]) => b - a);
  const top2 = scores.slice(0, 2).map(([k]) => k);
  const explanation = `Detected high ${top2.join(" and ")} cues designed to trigger immediate reaction.`;

  return {
    influenceVector,
    responseVector,
    explanation,
    timestamp: Date.now(),
    postId: post.id,
  };
}

export function updateVulnerabilityProfile(influence: InfluenceVector, response: ResponseVector) {
  const currentProfile = storage.getProfile<InfluenceVector>({
    fear: 0, urgency: 0, hype: 0, authority: 0, curiosity: 0, visual_hype: 0
  });

  // EWMA: new = 0.15 * responseValue + 0.85 * ewma_old
  // But responseValue is distinct from influence dimension. 
  // The prompt says: "For each influence dimension: ewma_new = 0.15*responseValue + 0.85*ewma_old"
  // This implies we map response back to influence? Or maybe responseValue is a scalar applied to the influence type?
  // Let's assume responseValue is the average of the response vector components, or specific mapping?
  // "responseValue" is singular in the prompt formula.
  // Maybe it means: If I respond to a "Fear" post, my "Fear" vulnerability goes up.
  // So responseValue = magnitude of response * magnitude of influence?
  // Let's define response magnitude = average of response vector.
  
  const responseMagnitude = (response.engagement + response.hesitation + response.fixation + response.clickbait_response) / 4;
  
  const newProfile = { ...currentProfile };
  (Object.keys(newProfile) as Array<keyof InfluenceVector>).forEach(key => {
    // If the post had this influence type, and I responded, my vulnerability to it increases.
    // If the post didn't have it, it shouldn't change much? 
    // The prompt formula is simple. Let's use:
    // input = influence[key] * responseMagnitude
    // ewma = 0.15 * input + 0.85 * old
    // Wait, if I don't encounter "fear", input is 0, so my fear vulnerability decays? That makes sense.
    
    const input = influence[key] * responseMagnitude;
    newProfile[key] = 0.15 * input + 0.85 * currentProfile[key];
  });

  storage.saveProfile(newProfile);
  
  // Update Pattern Graph
  // "Each event pushes a scalar intensity = sum(influenceVector)/numDimensions"
  const sumInfluence = Object.values(influence).reduce((a, b) => a + b, 0);
  const intensity = sumInfluence / 6;
  
  const pattern = storage.getPattern<number>();
  pattern.push(intensity);
  if (pattern.length > 7) pattern.shift(); // Keep last 7
  storage.savePattern(pattern);
}

export function getVulnerabilityProfile() {
  const profile = storage.getProfile<InfluenceVector | null>(null);
  
  if (!profile) {
    // Default profile based on mock posts (Fear, Hype, Urgency)
    return {
      fear: 0.45,
      urgency: 0.3,
      hype: 0.6,
      authority: 0.2,
      curiosity: 0.1,
      visual_hype: 0.4
    };
  }
  
  return profile;
}

export function getPatternGraph() {
  const pattern = storage.getPattern<number>();
  
  if (pattern.length === 0) {
    // Default pattern
    return [0.2, 0.4, 0.3, 0.6, 0.5, 0.4, 0.55];
  }
  
  return pattern;
}

export function resetData() {
  storage.reset();
}
