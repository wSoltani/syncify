export interface MeterProps {
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
