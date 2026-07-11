import { describe, expect, it } from 'vitest';
import { Calculator } from './Calculator';
import { HorizontalMesh } from '../models/HorizontalMesh';
import { WorkArea } from '../models/WorkArea';
import { SET } from '../models/SET';

describe('Calculator', () => {
  it('should clamp negative patch cord quantities to zero', () => {
    const horizontalMesh = new HorizontalMesh(
      10,
      { type: 'cat6', maxSpeedGbps: 10, maxDistance: 55 },
      { data: 0, voice: 0, security: 0 },
      0
    );
    const workArea = new WorkArea([], 0, 0);

    Calculator.calculateHorizontalMesh(horizontalMesh, workArea, 3, 8, 2);

    const patchCords = workArea.getPatchCords();
    expect(patchCords.find((pc) => pc.color === 'Azul')?.quantity).toBe(0);
    expect(patchCords.find((pc) => pc.color === 'Amarelo')?.quantity).toBe(2);
    expect(patchCords.find((pc) => pc.color === 'Branco')?.quantity).toBe(8);
  });

  it('should clamp negative patch cable quantities to zero', () => {
    const set = new SET(
      1,
      [],
      { size: 20 },
      0,
      0,
      { size: 3, color: 'Laranja', quantity: 0 },
      { lc: 0, sc: 0 },
      1,
      24,
      4,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    );

    Calculator.calculateSET(
      set,
      2,
      6,
      3,
      { type: 'cat6', maxSpeedGbps: 10, maxDistance: 55 },
      4,
      { type: 'OM3', maxSpeedGbps: 10, maxDistance: 300 },
      true,
      true,
      true
    );

    const patchCables = set.getPatchCable();
    expect(patchCables.find((pc) => pc.color === 'Azul')?.quantity).toBe(0);
    expect(patchCables.find((pc) => pc.color === 'Amarelo')?.quantity).toBe(6);
    expect(patchCables.find((pc) => pc.color === 'Vermelho')?.quantity).toBe(12);
  });
});
