interface MeterProps {
  used: number;
  max: number;
  /** What's being counted, read out with the numbers. */
  label: string;
}

/** "Used 2 of 5" and one bar per slot, so a limit shows before it bites. */
export function Meter(props: MeterProps) {
  const used = Math.min(Math.max(props.used, 0), props.max);
  const text = `Used ${props.used} of ${props.max}`;
  return (
    <span
      className="syncify-meter"
      role="meter"
      aria-label={props.label}
      aria-valuemin={0}
      aria-valuemax={props.max}
      aria-valuenow={used}
      aria-valuetext={text}
      data-full={props.used >= props.max ? "true" : undefined}
    >
      <span className="syncify-cap">{text}</span>
      <span className="syncify-meter-bars" aria-hidden="true">
        {Array.from({ length: props.max }, (_, index) => (
          <span className="syncify-meter-bar" data-used={index < used ? "true" : undefined} key={index} />
        ))}
      </span>
    </span>
  );
}

interface UsageMeterProps {
  /** Bytes used. */
  used: number;
  /** Bytes allowed. */
  max: number;
  /** Over the limit, or held by it: drawn in the warning color. */
  warning?: boolean;
}

/** "Space used", a bar, then "144 KB of 256 KB". */
export function UsageMeter(props: UsageMeterProps) {
  const text = `${formatBytes(props.used)} of ${formatBytes(props.max)}`;
  const share = props.max > 0 ? Math.min(Math.max(props.used / props.max, 0), 1) : 0;
  return (
    <span
      className="syncify-usage"
      role="meter"
      aria-label="Space used"
      aria-valuemin={0}
      aria-valuemax={props.max}
      aria-valuenow={Math.min(props.used, props.max)}
      aria-valuetext={text}
      data-warning={props.warning ? "true" : undefined}
    >
      <span className="syncify-cap">Space used</span>
      <span className="syncify-usage-bar" aria-hidden="true">
        <span className="syncify-usage-fill" style={{ width: `${share * 100}%` }} />
      </span>
      <span className="syncify-cap">{text}</span>
    </span>
  );
}

/** "0 KB", "9 KB", "131 KB": whole kilobytes, rounded up so a size over a limit never reads as the limit. */
export function formatBytes(bytes: number): string {
  return `${Math.ceil(Math.max(bytes, 0) / 1024)} KB`;
}
