import Icon from "@ant-design/icons";

const PlusCircleSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1.5em" height="1.5em" fill="currentColor">
    <circle cx="512" cy="512" r="400" fill="#1d4ed8" />
    <path
      d="M512 272c-22.091 0-40 17.909-40 40v160H312c-22.091 0-40 17.909-40 40s17.909 40 40 40h160v160c0 22.091 17.909 40 40 40s40-17.909 40-40V552h160c22.091 0 40-17.909 40-40s-17.909-40-40-40H552V312c0-22.091-17.909-40-40-40z"
      fill="#FFFFFF"
    />
  </svg>
);

const MinusCircleSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1.5em" height="1.5em" fill="currentColor">
    <circle cx="512" cy="512" r="400" fill="#FF5722" />
    <rect x="312" y="472" width="400" height="80" fill="#FFFFFF" />
  </svg>
);

export const CustomPlusCircleIcon = (props) => (
  <Icon component={PlusCircleSvg} {...props} />
);

export const CustomMinusCircleIcon = (props) => (
  <Icon component={MinusCircleSvg} {...props} />
);
