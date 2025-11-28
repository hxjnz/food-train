'use client';

import { useEffect, useRef } from 'react';

interface ShakeDetectionOptions {
  threshold?: number; // 摇动阈值
  timeout?: number; // 两次摇动之间的最小间隔（毫秒）
  onShake: () => void; // 摇动时的回调函数
}

export function useShakeDetection({ 
  threshold = 15, 
  timeout = 1000, 
  onShake 
}: ShakeDetectionOptions) {
  const lastShakeTime = useRef<number>(0);
  const lastAcceleration = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // 检查是否支持 DeviceMotion API
    if (typeof window === 'undefined' || !window.DeviceMotionEvent) {
      console.warn('Device motion not supported');
      return;
    }

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      
      if (!acceleration || 
          acceleration.x === null || 
          acceleration.y === null || 
          acceleration.z === null) {
        return;
      }

      const now = Date.now();
      
      // 如果距离上次摇动时间太短，忽略
      if (now - lastShakeTime.current < timeout) {
        return;
      }

      // 计算加速度变化
      const deltaX = Math.abs(acceleration.x - lastAcceleration.current.x);
      const deltaY = Math.abs(acceleration.y - lastAcceleration.current.y);
      const deltaZ = Math.abs(acceleration.z - lastAcceleration.current.z);

      // 更新上次加速度
      lastAcceleration.current = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z,
      };

      // 检测是否超过阈值（摇动）
      const totalDelta = deltaX + deltaY + deltaZ;
      
      if (totalDelta > threshold) {
        lastShakeTime.current = now;
        
        // 触发震动反馈（如果设备支持）
        if (navigator.vibrate) {
          navigator.vibrate([50, 100, 50]); // 震动模式：50ms-停100ms-50ms
        }
        
        // 触发回调
        onShake();
      }
    };

    // 添加事件监听器
    window.addEventListener('devicemotion', handleMotion);

    // 清理函数
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [threshold, timeout, onShake]);
}

