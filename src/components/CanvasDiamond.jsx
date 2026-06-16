import React, { useRef, useEffect } from 'react';
import roundDiamondTopImg from '../assets/round_diamond_top.png';
import roundDiamondSideImg from '../assets/round_diamond_side.png';

// Global variables to cache processed transparent round diamond views
let globalTopCanvas = null;
let globalSideCanvas = null;
let globalImagesLoaded = false;
let globalCallbacks = [];

function loadAndProcessImages(onComplete) {
  if (globalTopCanvas && globalSideCanvas) {
    onComplete(globalTopCanvas, globalSideCanvas);
    return;
  }

  globalCallbacks.push(onComplete);

  if (globalImagesLoaded) return;
  globalImagesLoaded = true;

  let topLoaded = false;
  let sideLoaded = false;

  const checkComplete = () => {
    if (topLoaded && sideLoaded) {
      globalCallbacks.forEach((cb) => cb(globalTopCanvas, globalSideCanvas));
      globalCallbacks = [];
    }
  };

  const topImg = new Image();
  topImg.src = roundDiamondTopImg;
  topImg.onload = () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = topImg.width;
    tempCanvas.height = topImg.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(topImg, 0, 0);
    const imgData = tempCtx.getImageData(0, 0, topImg.width, topImg.height);
    const pixels = imgData.data;

    let minY = topImg.height;
    for (let y = 0; y < topImg.height; y++) {
      let foundPixel = false;
      for (let x = 0; x < topImg.width; x++) {
        const idx = (y * topImg.width + x) * 4;
        if (pixels[idx] < 250 || pixels[idx + 1] < 250 || pixels[idx + 2] < 250) {
          minY = y;
          foundPixel = true;
          break;
        }
      }
      if (foundPixel) break;
    }

    const scanLimitY = Math.min(topImg.height - 1, Math.floor(minY + (topImg.height - minY) * 0.65));
    let minX = topImg.width;
    let maxX = 0;
    for (let y = minY; y <= scanLimitY; y++) {
      for (let x = 0; x < topImg.width; x++) {
        const idx = (y * topImg.width + x) * 4;
        if (pixels[idx] < 250 || pixels[idx + 1] < 250 || pixels[idx + 2] < 250) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }

    const bw = maxX - minX;
    const bh = bw;
    const pad = 2;
    const cropX = Math.max(0, Math.min(topImg.width - 1, minX - pad));
    const cropY = Math.max(0, Math.min(topImg.height - 1, minY - pad));
    const cropW = Math.min(topImg.width - cropX, bw + pad * 2);
    const cropH = Math.min(topImg.height - cropY, bh + pad * 2);
    const r = cropW / 2 - 2;

    const offscreen = document.createElement('canvas');
    offscreen.width = cropW;
    offscreen.height = cropH;
    const offCtx = offscreen.getContext('2d');
    offCtx.drawImage(topImg, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const croppedData = offCtx.getImageData(0, 0, cropW, cropH);
    const cPixels = croppedData.data;
    for (let y = 0; y < cropH; y++) {
      for (let x = 0; x < cropW; x++) {
        const idx = (y * cropW + x) * 4;
        if ((x - cropW/2)**2 + (y - cropH/2)**2 > r**2) {
          cPixels[idx + 3] = 0;
        }
      }
    }
    offCtx.putImageData(croppedData, 0, 0);
    globalTopCanvas = offscreen;
    topLoaded = true;
    checkComplete();
  };

  const sideImg = new Image();
  sideImg.src = roundDiamondSideImg;
  sideImg.onload = () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = sideImg.width;
    tempCanvas.height = sideImg.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(sideImg, 0, 0);
    const imgData = tempCtx.getImageData(0, 0, sideImg.width, sideImg.height);
    const pixels = imgData.data;

    let minY = sideImg.height;
    let maxY = 0;
    let minX = sideImg.width;
    let maxX = 0;

    for (let y = 0; y < sideImg.height; y++) {
      for (let x = 0; x < sideImg.width; x++) {
        const idx = (y * sideImg.width + x) * 4;
        if (pixels[idx] < 242 || pixels[idx + 1] < 242 || pixels[idx + 2] < 242) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const pad = 2;
    const cropX = Math.max(0, Math.min(sideImg.width - 1, minX - pad));
    const cropY = Math.max(0, Math.min(sideImg.height - 1, minY - pad));
    const cropW = Math.min(sideImg.width - cropX, maxX - minX + pad * 2);
    const cropH = Math.min(sideImg.height - cropY, maxY - minY + pad * 2);

    const offscreen = document.createElement('canvas');
    offscreen.width = cropW;
    offscreen.height = cropH;
    const offCtx = offscreen.getContext('2d');
    offCtx.drawImage(sideImg, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const croppedData = offCtx.getImageData(0, 0, cropW, cropH);
    const cPixels = croppedData.data;

    for (let y = 0; y < cropH; y++) {
      let lx = cropW;
      let rx = 0;
      for (let x = 0; x < cropW; x++) {
        const idx = (y * cropW + x) * 4;
        if (cPixels[idx] < 242 || cPixels[idx + 1] < 242 || cPixels[idx + 2] < 242) {
          if (x < lx) lx = x;
          if (x > rx) rx = x;
        }
      }
      for (let x = 0; x < cropW; x++) {
        const idx = (y * cropW + x) * 4;
        if (x < lx || x > rx) {
          cPixels[idx + 3] = 0;
        }
      }
    }
    offCtx.putImageData(croppedData, 0, 0);
    globalSideCanvas = offscreen;
    sideLoaded = true;
    checkComplete();
  };
}

// Configuration profiles for each diamond shape to make them look distinct and unique
const SHAPE_CONFIGS = {
  Round: {
    hueStart: 200, hueRange: 35, // Brilliant Ice Blue / Cyan
    sparkleRate: 0.005,
    opacityBase: 0.82,
    darkContrast: 0.85,
    dispersion: 0.55,
    speedX: 0.003, speedY: 0.006, speedZ: 0.008, // Slightly faster 2D rotation for the real image
    tiltX: 0.45
  },
  Oval: {
    hueStart: 185, hueRange: 45, // Ice Teal / Cyan
    sparkleRate: 0.004,
    opacityBase: 0.76,
    darkContrast: 0.8,
    dispersion: 0.48,
    speedX: -0.002, speedY: 0.005, speedZ: 0.003,
    tiltX: 0.52
  },
  Cushion: {
    hueStart: 45, hueRange: 35, // Warm Champagne / Golden fire
    sparkleRate: 0.003,
    opacityBase: 0.8,
    darkContrast: 0.82,
    dispersion: 0.35,
    speedX: 0.004, speedY: -0.004, speedZ: 0.0015,
    tiltX: -0.42 // tilt backward
  },
  Princess: {
    hueStart: 275, hueRange: 55, // Vivid Purple / Magenta
    sparkleRate: 0.006,
    opacityBase: 0.85,
    darkContrast: 0.9,
    dispersion: 0.62,
    speedX: 0.005, speedY: 0.007, speedZ: -0.003,
    tiltX: 0.35
  },
  Emerald: {
    hueStart: 205, hueRange: 15, // Ultra-clean silver mirror reflections (very low color dispersion)
    sparkleRate: 0.001, // step cuts rarely sparkle on vertices
    opacityBase: 0.92,
    darkContrast: 0.95, // high-contrast black/white lines
    dispersion: 0.12,
    speedX: -0.004, speedY: 0.004, speedZ: 0.002,
    tiltX: 0.6
  },
  Radiant: {
    hueStart: 195, hueRange: 40, // Cyan brilliant
    sparkleRate: 0.007,
    opacityBase: 0.81,
    darkContrast: 0.88,
    dispersion: 0.52,
    speedX: 0.003, speedY: -0.006, speedZ: -0.0025,
    tiltX: -0.5
  },
  Marquise: {
    hueStart: 35, hueRange: 45, // Amber / Warm Orange fire
    sparkleRate: 0.005,
    opacityBase: 0.78,
    darkContrast: 0.83,
    dispersion: 0.42,
    speedX: 0.005, speedY: 0.006, speedZ: 0.004,
    tiltX: 0.28
  },
  Pear: {
    hueStart: 310, hueRange: 60, // Rose Pink / Violet dispersion
    sparkleRate: 0.005,
    opacityBase: 0.79,
    darkContrast: 0.84,
    dispersion: 0.5,
    speedX: -0.003, speedY: 0.005, speedZ: -0.0035,
    tiltX: 0.48
  },
  Heart: {
    hueStart: 335, hueRange: 45, // Romantic Soft Rose Pink
    sparkleRate: 0.004,
    opacityBase: 0.84,
    darkContrast: 0.86,
    dispersion: 0.38,
    speedX: 0.002, speedY: -0.003, speedZ: 0.001,
    tiltX: 0.38
  }
};

export default function CanvasDiamond({ shape, isHovered, size = 130 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set high-DPI canvas resolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Get configuration for this shape
    const config = SHAPE_CONFIGS[shape] || SHAPE_CONFIGS.Round;

    // 3D Geometry definition
    const geometry = getDiamondGeometry(shape);
    
    // Rotation state — 2D turntable spin only (Y-axis)
    // angleX is a fixed tilt so you can see the facets from a nice angle
    let angleX = config.tiltX;
    let angleY = Math.random() * Math.PI * 2;
    let angleZ = 0; // No roll — flat 2D rotation

    // Only Y-axis rotation speed (turntable spin)
    const speedY = config.speedY;

    // Sparkle tracking (stores x, y for image mode, or vertexIdx for 3D mode)
    const sparkles = [];

    let animationFrameId;

    const renderReal3dDiamond = (topCanvas, sideCanvas) => {
      ctx.clearRect(0, 0, size, size);

      // True 3D rotation: continuously increment ALL three axes
      const hoverMul = isHovered ? 0.15 : 1;
      angleX += 0.0055 * hoverMul;   // Tumble forward/backward
      angleY += 0.008 * hoverMul;    // Spin left/right
      angleZ += 0.0035 * hoverMul;   // Roll sideways

      const s = size * 0.85;
      const cx = size / 2;
      const cy = size / 2;

      // Build the 3D rotation matrix (Euler angles: X then Y then Z)
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);

      // The "up" vector of the diamond in world space after rotation
      // Diamond's local up is [0, 1, 0] (top face normal)
      // After rotation: R * [0,1,0]
      const upX = sinY * sinX * cosZ + cosY * (-sinZ); // actually let's compute properly
      // Full rotation matrix R = Rz * Ry * Rx
      // R[0][0] = cosZ*cosY, R[0][1] = cosZ*sinY*sinX - sinZ*cosX, R[0][2] = cosZ*sinY*cosX + sinZ*sinX
      // R[1][0] = sinZ*cosY, R[1][1] = sinZ*sinY*sinX + cosZ*cosX, R[1][2] = sinZ*sinY*cosX - cosZ*sinX
      // R[2][0] = -sinY,     R[2][1] = cosY*sinX,                  R[2][2] = cosY*cosX

      // Transform diamond's local Y-axis (up) through the rotation:
      // up_world = R * [0, 1, 0] = [R[0][1], R[1][1], R[2][1]]
      const localUpX = cosZ * sinY * sinX - sinZ * cosX;
      const localUpY = sinZ * sinY * sinX + cosZ * cosX;
      const localUpZ = cosY * sinX;

      // Transform diamond's local X-axis (right) through the rotation:
      // right_world = R * [1, 0, 0] = [R[0][0], R[1][0], R[2][0]]
      const localRightX = cosZ * cosY;
      const localRightY = sinZ * cosY;
      const localRightZ = -sinY;

      // Transform diamond's local Z-axis (forward) through the rotation:
      // fwd_world = R * [0, 0, 1] = [R[0][2], R[1][2], R[2][2]]
      const localFwdX = cosZ * sinY * cosX + sinZ * sinX;
      const localFwdY = sinZ * sinY * cosX - cosZ * sinX;
      const localFwdZ = cosY * cosX;

      // --- Determine what's visible ---
      // localUpZ tells us how much the top face points toward/away from camera (camera looks down -Z)
      // localUpZ > 0: top face tilted toward camera (we see the top)
      // localUpZ < 0: top face tilted away (we see the bottom/pavilion)
      const topFaceTilt = localUpZ; // cos of angle between top-face normal and camera axis

      // How much the side profile is visible (perpendicular component)
      // Side profile is visible when the diamond is tilted (top face not flat to camera)
      const sideVisibility = Math.sqrt(1 - topFaceTilt * topFaceTilt); // sin of tilt

      // Compute the on-screen angle of the diamond's up direction (for rotation of the drawn images)
      const screenAngle = Math.atan2(localUpX, -localUpY);

      // --- Drawing helpers ---
      const drawTopFace = () => {
        if (Math.abs(topFaceTilt) < 0.02) return; // Edge-on, skip

        const topSize = s * 0.94;
        // The top face appears as an ellipse: full width, compressed by tilt
        const ellipseScale = Math.abs(topFaceTilt);

        ctx.save();
        ctx.translate(cx, cy);
        // Rotate to match the diamond's screen orientation
        ctx.rotate(screenAngle);
        // Compress vertically to simulate foreshortening
        ctx.scale(1, ellipseScale);
        // Spin the table facets (continuous Z rotation projected onto the face)
        ctx.rotate(angleY * 1.3);
        ctx.drawImage(topCanvas, -topSize / 2, -topSize / 2, topSize, topSize);
        ctx.restore();
      };

      const drawSideProfile = () => {
        if (sideVisibility < 0.02) return; // Flat top view, no side visible

        const sideW = s;
        const sideH = s * 0.72 * sideVisibility;
        const flipSign = topFaceTilt >= 0 ? 1 : -1;

        ctx.save();
        ctx.translate(cx, cy);
        // Rotate the side profile to match the diamond's tilt direction on screen
        ctx.rotate(screenAngle);
        // Offset the side profile so it appears below the top face
        ctx.translate(0, flipSign * Math.abs(topFaceTilt) * s * 0.12);
        ctx.scale(1, flipSign);

        ctx.drawImage(sideCanvas, -sideW / 2, -sideH / 2, sideW, sideH);

        // Shimmer reflection overlay
        ctx.globalAlpha = 0.28 * (0.5 + 0.5 * Math.sin(angleY * 2.5));
        ctx.scale(-1, 1);
        ctx.drawImage(sideCanvas, -sideW / 2, -sideH / 2, sideW, sideH);
        ctx.restore();
      };

      // --- Z-order: draw back layer first, front layer on top ---
      if (topFaceTilt >= 0) {
        // Top face is toward camera: draw side behind, then top on front
        drawSideProfile();
        drawTopFace();
      } else {
        // Top face is away from camera (seeing bottom): draw top behind, side in front
        drawTopFace();
        drawSideProfile();
      }

      // --- Sparkles overlay ---
      const sparkleChance = isHovered ? 0.08 : 0.015;
      if (Math.random() < sparkleChance && sparkles.length < 4) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * size * 0.34;
        sparkles.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          maxSize: 10 + Math.random() * 8 + (isHovered ? 6 : 0),
          size: 0,
          opacity: 0,
          phase: 'grow'
        });
      }

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        if (sp.phase === 'grow') {
          sp.size += 0.8;
          sp.opacity = Math.min(1, sp.opacity + 0.08);
          if (sp.size >= sp.maxSize) {
            sp.phase = 'shrink';
          }
        } else {
          sp.size -= 0.5;
          sp.opacity = Math.max(0, sp.opacity - 0.05);
          if (sp.opacity <= 0 || sp.size <= 0) {
            sparkles.splice(i, 1);
            continue;
          }
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${sp.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sp.x - sp.size, sp.y); ctx.lineTo(sp.x + sp.size, sp.y);
        ctx.moveTo(sp.x, sp.y - sp.size); ctx.lineTo(sp.x, sp.y + sp.size);
        const diag = sp.size * 0.6;
        ctx.moveTo(sp.x - diag, sp.y - diag); ctx.lineTo(sp.x + diag, sp.y + diag);
        ctx.moveTo(sp.x - diag, sp.y + diag); ctx.lineTo(sp.x + diag, sp.y - diag);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${sp.opacity})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(() => renderReal3dDiamond(topCanvas, sideCanvas));
    };

    const render = () => {

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Adjust angles — only Y-axis spins (2D turntable rotation)
      if (!isHovered) {
        angleY += speedY;
      } else {
        angleY += speedY * 0.15;
      }

      // Rotate vertices
      const rotated = geometry.vertices.map((v) => {
        let y1 = v[1] * Math.cos(angleX) - v[2] * Math.sin(angleX);
        let z1 = v[1] * Math.sin(angleX) + v[2] * Math.cos(angleX);
        let x2 = v[0] * Math.cos(angleY) + z1 * Math.sin(angleY);
        let z2 = -v[0] * Math.sin(angleY) + z1 * Math.cos(angleY);
        let x3 = x2 * Math.cos(angleZ) - y1 * Math.sin(angleZ);
        let y3 = x2 * Math.sin(angleZ) + y1 * Math.cos(angleZ);
        return [x3, y3, z2];
      });

      // Projection parameters
      const scale = size * 0.42; // scale factor
      const centerX = size / 2;
      const centerY = size / 2;
      const cameraDepth = 2.5;

      // Project vertices to 2D
      const projected = rotated.map((r) => {
        const perspective = cameraDepth / (cameraDepth - r[2]);
        const px = centerX + r[0] * scale * perspective;
        const py = centerY - r[1] * scale * perspective; // Invert Y for canvas coordinates
        return { x: px, y: py, z: r[2] };
      });

      // Calculate face average Z for sorting (Painter's algorithm)
      const sortedFaces = geometry.faces.map((faceIndices, faceIdx) => {
        let avgZ = 0;
        faceIndices.forEach((idx) => {
          avgZ += rotated[idx][2];
        });
        avgZ /= faceIndices.length;
        return { indices: faceIndices, avgZ, faceIdx };
      }).sort((a, b) => a.avgZ - b.avgZ); // Sort back to front (ascending Z)




      // Light direction vector (tilted from top-right-front)
      const lightDir = [0.5, 0.7, 0.5];
      // Normalize lightDir
      const len = Math.sqrt(lightDir[0] * lightDir[0] + lightDir[1] * lightDir[1] + lightDir[2] * lightDir[2]);
      lightDir[0] /= len; lightDir[1] /= len; lightDir[2] /= len;

      // Draw faces (Painter's algorithm renders back-to-front, but we cull backfaces completely for solidity)
      sortedFaces.forEach(({ indices, faceIdx }) => {
        // We need 3 vertices to calculate normal
        const p0 = rotated[indices[0]];
        const p1 = rotated[indices[1]];
        const p2 = rotated[indices[2]];

        // Normal vectors
        const ux = p1[0] - p0[0];
        const uy = p1[1] - p0[1];
        const uz = p1[2] - p0[2];

        const vx = p2[0] - p0[0];
        const vy = p2[1] - p0[1];
        const vz = p2[2] - p0[2];

        // Cross product (U x V)
        let nx = uy * vz - uz * vy;
        let ny = uz * vx - ux * vz;
        let nz = ux * vy - uy * vx;

        // Normalize
        const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz);
        if (nLen > 0.0001) {
          nx /= nLen; ny /= nLen; nz /= nLen;
        }

        // BACK-FACE CULLING: Skip drawing back-facing facets entirely to make it look solid!
        const isFrontFacing = nz > 0;
        if (!isFrontFacing) return;
        
        // Dot product normal with light direction
        const dot = nx * lightDir[0] + ny * lightDir[1] + nz * lightDir[2];
        const intensity = Math.max(0, dot);

        // Volumetric filling path
        ctx.beginPath();
        indices.forEach((idx, i) => {
          const pt = projected[idx];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();

        // Facet color calculations from shape configuration
        const opacityBase = isHovered ? config.opacityBase + 0.06 : config.opacityBase;
        let fillColor;

        const specularLimit = config.specularLimit !== undefined ? config.specularLimit : 0.88;
        if (intensity > specularLimit) {
          // Specular highlight: bright glittering ice white-blue
          fillColor = `rgba(255, 255, 255, ${0.85 + intensity * 0.15})`;
        } else if (intensity > 0.35) {
          // Midtone dispersion fire: unique color spectrums per shape!
          const fireHue = (config.hueStart + (faceIdx * 35) % config.hueRange) % 360;
          fillColor = `hsla(${fireHue}, 90%, 93%, ${opacityBase - 0.12})`;
        } else if (intensity > 0.1) {
          // Low midtone: standard ice blue transparency
          fillColor = `rgba(224, 242, 254, ${opacityBase - 0.22})`;
        } else {
          // Shadow facets: dark charcoal contrast (crucial for diamond realism!)
          const darkVal = Math.round(20 * (1 - config.darkContrast));
          fillColor = `rgba(${darkVal}, ${darkVal + 4}, ${darkVal + 10}, ${opacityBase})`;
        }

        ctx.fillStyle = fillColor;
        ctx.fill();

        // Edge styling: white/ice-blue facets wires (NO yellow borders)
        ctx.strokeStyle = isHovered ? 'rgba(255, 255, 255, 0.36)' : 'rgba(255, 255, 255, 0.16)';
        ctx.lineWidth = isHovered ? 0.95 : 0.7;
        ctx.stroke();

        // Occasional vertex sparkle trigger using shape configuration rate
        if (intensity > 0.85 && Math.random() < config.sparkleRate && sparkles.length < 4) {
          const randIdx = indices[Math.floor(Math.random() * indices.length)];
          if (!sparkles.some((s) => s.vertexIdx === randIdx)) {
            sparkles.push({
              vertexIdx: randIdx,
              maxSize: 10 + Math.random() * 8 + (isHovered ? 6 : 0),
              size: 0,
              opacity: 0,
              phase: 'grow'
            });
          }
        }
      });

      // Render Active Sparkle Flares
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        const pt = projected[s.vertexIdx];
        if (!pt) {
          sparkles.splice(i, 1);
          continue;
        }

        // Handle animation phase
        if (s.phase === 'grow') {
          s.size += 0.8;
          s.opacity = Math.min(1, s.opacity + 0.08);
          if (s.size >= s.maxSize) {
            s.phase = 'shrink';
          }
        } else {
          s.size -= 0.5;
          s.opacity = Math.max(0, s.opacity - 0.05);
          if (s.opacity <= 0 || s.size <= 0) {
            sparkles.splice(i, 1);
            continue;
          }
        }

        // Draw cross star flare
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        // Main cross
        ctx.moveTo(pt.x - s.size, pt.y); ctx.lineTo(pt.x + s.size, pt.y);
        ctx.moveTo(pt.x, pt.y - s.size); ctx.lineTo(pt.x, pt.y + s.size);
        // Diagonal cross (softer)
        const diag = s.size * 0.6;
        ctx.moveTo(pt.x - diag, pt.y - diag); ctx.lineTo(pt.x + diag, pt.y + diag);
        ctx.moveTo(pt.x - diag, pt.y + diag); ctx.lineTo(pt.x + diag, pt.y - diag);
        ctx.stroke();

        // Glowing center dot
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // All shapes (including Round) use the unified 3D polygon renderer
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [shape, isHovered, size]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ display: 'block', pointerEvents: 'none' }}
    />
  );
}

// Procedural 3D Diamond models
function getDiamondGeometry(shape) {
  let vertices = []; // [x, y, z]
  let faces = [];    // [idx1, idx2, idx3, ...]

  switch (shape) {
    case 'Round': {
      const segs = 16; // High segment count for smooth circular diamond
      // 0: Culet (bottom point)
      vertices.push([0, -0.92, 0]);
      // 1..16: Girdle vertices (widest ring)
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        vertices.push([Math.cos(theta) * 0.9, 0.0, Math.sin(theta) * 0.9]);
      }
      // 17..32: Lower crown / star facet ring (between girdle and table)
      for (let i = 0; i < segs; i++) {
        const theta = ((i + 0.5) * 2 * Math.PI) / segs; // offset half-step for star pattern
        vertices.push([Math.cos(theta) * 0.62, 0.28, Math.sin(theta) * 0.62]);
      }
      // 33..48: Upper crown / table edge ring
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        vertices.push([Math.cos(theta) * 0.42, 0.46, Math.sin(theta) * 0.42]);
      }
      // 49: Table center
      vertices.push([0, 0.46, 0]);

      // --- Faces ---
      // Pavilion triangles (girdle -> culet)
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([1 + i, 1 + next, 0]);
      }
      // Lower crown: girdle -> star facet ring (kite-shaped, split into triangles)
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        // Triangle: girdle[i], girdle[next], star[i]
        faces.push([1 + i, 1 + next, 17 + i]);
        // Triangle: girdle[next], star[next], star[i]  (wraps the kite)
        faces.push([1 + next, 17 + ((i + 1) % segs), 17 + i]);
      }
      // Upper crown: star facet ring -> table edge ring
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        // Triangle: star[i], tableEdge[i], tableEdge[next % segs]
        faces.push([17 + i, 33 + i, 33 + next]);
        // Triangle: star[i], tableEdge[next], star[next]
        faces.push([17 + i, 33 + next, 17 + next]);
      }
      // Table face triangles (table edge -> center)
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([49, 33 + next, 33 + i]);
      }
      break;
    }
    case 'Oval': {
      const segs = 8;
      vertices.push([0, -0.9, 0]);
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        vertices.push([Math.cos(theta) * 0.65, 0.0, Math.sin(theta) * 0.95]);
      }
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        vertices.push([Math.cos(theta) * 0.34, 0.45, Math.sin(theta) * 0.5]);
      }
      vertices.push([0, 0.45, 0]);

      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([1 + i, 1 + next, 0]);
      }
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([9 + i, 1 + i, 1 + next]);
        faces.push([9 + i, 1 + next, 9 + next]);
      }
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([17, 9 + next, 9 + i]);
      }
      break;
    }
    case 'Cushion': {
      const segs = 8;
      vertices.push([0, -0.9, 0]);
      // Girdle (bulged square)
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        const r = 0.95 * (1.0 - 0.12 * Math.abs(Math.sin(2 * theta)));
        vertices.push([Math.cos(theta) * r, 0.0, Math.sin(theta) * r]);
      }
      // Table
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        const r = 0.52 * (1.0 - 0.12 * Math.abs(Math.sin(2 * theta)));
        vertices.push([Math.cos(theta) * r, 0.45, Math.sin(theta) * r]);
      }
      vertices.push([0, 0.45, 0]);

      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([1 + i, 1 + next, 0]);
      }
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([9 + i, 1 + i, 1 + next]);
        faces.push([9 + i, 1 + next, 9 + next]);
      }
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([17, 9 + next, 9 + i]);
      }
      break;
    }
    case 'Princess': {
      vertices.push([0, -0.9, 0]); // Culet
      // Girdle (Square shape)
      vertices.push([-0.8, 0.0, -0.8]);
      vertices.push([0.8, 0.0, -0.8]);
      vertices.push([0.8, 0.0, 0.8]);
      vertices.push([-0.8, 0.0, 0.8]);
      // Table
      vertices.push([-0.42, 0.45, -0.42]);
      vertices.push([0.42, 0.45, -0.42]);
      vertices.push([0.42, 0.45, 0.42]);
      vertices.push([-0.42, 0.45, 0.42]);
      // Center
      vertices.push([0, 0.45, 0]);

      faces.push([1, 2, 0]); faces.push([2, 3, 0]); faces.push([3, 4, 0]); faces.push([4, 1, 0]);

      faces.push([5, 1, 2]); faces.push([5, 2, 6]);
      faces.push([6, 2, 3]); faces.push([6, 3, 7]);
      faces.push([7, 3, 4]); faces.push([7, 4, 8]);
      faces.push([8, 4, 1]); faces.push([8, 1, 5]);

      faces.push([9, 6, 5]); faces.push([9, 7, 6]); faces.push([9, 8, 7]); faces.push([9, 5, 8]);
      break;
    }
    case 'Emerald': {
      // Keel line bottom
      vertices.push([-0.3, -0.75, 0]);
      vertices.push([0.3, -0.75, 0]);
      
      // Girdle (Cut corners rectangle)
      vertices.push([-0.8, 0.0, -0.5]); // 2
      vertices.push([-0.5, 0.0, -0.8]); // 3
      vertices.push([0.5, 0.0, -0.8]);  // 4
      vertices.push([0.8, 0.0, -0.5]);  // 5
      vertices.push([0.8, 0.0, 0.5]);   // 6
      vertices.push([0.5, 0.0, 0.8]);   // 7
      vertices.push([-0.5, 0.0, 0.8]);  // 8
      vertices.push([-0.8, 0.0, 0.5]);  // 9

      // Table
      vertices.push([-0.45, 0.45, -0.3]); // 10
      vertices.push([-0.3, 0.45, -0.45]); // 11
      vertices.push([0.3, 0.45, -0.45]);  // 12
      vertices.push([0.45, 0.45, -0.3]);  // 13
      vertices.push([0.45, 0.45, 0.3]);   // 14
      vertices.push([0.3, 0.45, 0.45]);   // 15
      vertices.push([-0.3, 0.45, 0.45]);  // 16
      vertices.push([-0.45, 0.45, 0.3]);  // 17
      vertices.push([0, 0.45, 0]);        // 18

      // Pavilion
      faces.push([2, 3, 0]); faces.push([3, 4, 0]);
      faces.push([4, 5, 1]); faces.push([5, 6, 1]);
      faces.push([6, 7, 1]); faces.push([7, 8, 1]);
      faces.push([8, 9, 0]); faces.push([9, 2, 0]);
      faces.push([0, 1, 7]); faces.push([0, 7, 8]);
      faces.push([0, 4, 1]); faces.push([0, 3, 4]);

      // Crown
      for (let i = 0; i < 8; i++) {
        const next = (i + 1) % 8;
        faces.push([10 + i, 2 + i, 2 + next]);
        faces.push([10 + i, 2 + next, 10 + next]);
      }
      // Table
      for (let i = 0; i < 8; i++) {
        const next = (i + 1) % 8;
        faces.push([18, 10 + next, 10 + i]);
      }
      break;
    }
    case 'Radiant': {
      vertices.push([0, -0.9, 0]); // Culet
      // Girdle
      vertices.push([-0.8, 0.0, -0.5]); // 1
      vertices.push([-0.5, 0.0, -0.8]); // 2
      vertices.push([0.5, 0.0, -0.8]);  // 3
      vertices.push([0.8, 0.0, -0.5]);  // 4
      vertices.push([0.8, 0.0, 0.5]);   // 5
      vertices.push([0.5, 0.0, 0.8]);   // 6
      vertices.push([-0.5, 0.0, 0.8]);  // 7
      vertices.push([-0.8, 0.0, 0.5]);  // 8

      // Table
      vertices.push([-0.45, 0.45, -0.3]); // 9
      vertices.push([-0.3, 0.45, -0.45]); // 10
      vertices.push([0.3, 0.45, -0.45]);  // 11
      vertices.push([0.45, 0.45, -0.3]);  // 12
      vertices.push([0.45, 0.45, 0.3]);   // 13
      vertices.push([0.3, 0.45, 0.45]);   // 14
      vertices.push([-0.3, 0.45, 0.45]);  // 15
      vertices.push([-0.45, 0.45, 0.3]);  // 16
      vertices.push([0, 0.45, 0]);        // 17

      // Pavilion
      for (let i = 0; i < 8; i++) {
        const next = (i + 1) % 8;
        faces.push([1 + i, 1 + next, 0]);
      }
      // Crown
      for (let i = 0; i < 8; i++) {
        const next = (i + 1) % 8;
        faces.push([9 + i, 1 + i, 1 + next]);
        faces.push([9 + i, 1 + next, 9 + next]);
      }
      // Table
      for (let i = 0; i < 8; i++) {
        const next = (i + 1) % 8;
        faces.push([17, 9 + next, 9 + i]);
      }
      break;
    }
    case 'Marquise': {
      const segs = 8;
      vertices.push([0, -0.9, 0]); // Culet
      // Girdle (pointed navette)
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        const z = Math.sin(theta) * 0.95;
        const x = Math.cos(theta) * 0.5 * (1.0 - Math.abs(z) * 0.5);
        vertices.push([x, 0.0, z]);
      }
      // Table
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        const z = Math.sin(theta) * 0.45;
        const x = Math.cos(theta) * 0.24 * (1.0 - Math.abs(z/0.45) * 0.5);
        vertices.push([x, 0.45, z]);
      }
      vertices.push([0, 0.45, 0]);

      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([1 + i, 1 + next, 0]);
      }
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([9 + i, 1 + i, 1 + next]);
        faces.push([9 + i, 1 + next, 9 + next]);
      }
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([17, 9 + next, 9 + i]);
      }
      break;
    }
    case 'Pear': {
      const segs = 8;
      vertices.push([0, -0.9, 0]);
      // Girdle
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        const z = Math.sin(theta) * 0.95;
        let x = Math.cos(theta) * 0.6;
        if (z > 0) x *= (1.0 - z / 0.95 * 0.85); // pinch one side
        vertices.push([x, 0.0, z]);
      }
      // Table
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        const z = Math.sin(theta) * 0.45;
        let x = Math.cos(theta) * 0.28;
        if (z > 0) x *= (1.0 - z / 0.45 * 0.85);
        vertices.push([x, 0.45, z]);
      }
      vertices.push([0, 0.45, 0]);

      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([1 + i, 1 + next, 0]);
      }
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([9 + i, 1 + i, 1 + next]);
        faces.push([9 + i, 1 + next, 9 + next]);
      }
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([17, 9 + next, 9 + i]);
      }
      break;
    }
    case 'Heart': {
      const segs = 8;
      vertices.push([0, -0.8, 0]); // Culet
      // Girdle heart shape
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        const t = theta;
        let x = Math.sin(t) * Math.sin(t) * Math.sin(t);
        let z = (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) / 16;
        x *= 0.85;
        z = (z * 0.85) + 0.12;
        vertices.push([x, 0.0, z]);
      }
      // Table heart shape
      for (let i = 0; i < segs; i++) {
        const theta = (i * 2 * Math.PI) / segs;
        const t = theta;
        let x = Math.sin(t) * Math.sin(t) * Math.sin(t);
        let z = (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) / 16;
        x *= 0.42;
        z = (z * 0.42) + 0.08;
        vertices.push([x, 0.45, z]);
      }
      vertices.push([0, 0.45, 0.08]);

      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([1 + i, 1 + next, 0]);
      }
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([9 + i, 1 + i, 1 + next]);
        faces.push([9 + i, 1 + next, 9 + next]);
      }
      for (let i = 0; i < segs; i++) {
        const next = (i + 1) % segs;
        faces.push([17, 9 + next, 9 + i]);
      }
      break;
    }
  }

  return { vertices, faces };
}
