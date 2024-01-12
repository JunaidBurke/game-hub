import { ImageProps, Image } from "@chakra-ui/react";
import bullsEye from "../assets/bulls-eye.webp";
import meh from "../assets/meh.webp";
import thumbsUp from "../assets/thumbs-up.webp";

interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;

  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: bullsEye, alt: "exceptional", boxSize: "35px" },
    4: { src: meh, alt: "meh", boxSize: "25px" },
    5: { src: thumbsUp, alt: "recommended", boxSize: "25px" },
  };

  return <Image {...emojiMap[rating]} marginTop={1} />;
};

export default Emoji;
