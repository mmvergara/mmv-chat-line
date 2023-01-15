import { Skeleton } from "@mantine/core";
interface ChatMessageSkeletonProps {}
const ChatMessageSkeleton: React.FC<ChatMessageSkeletonProps> = () => {
  return (
    <>
      <Skeleton height={8} mt={6} width='20%' radius='xl' />
      <Skeleton height={8} mt={6} width='40%' radius='xl' />
      <Skeleton height={8} mt={6} width='50%' radius='xl' />
      <Skeleton height={8} mt={20} width='33%' ml='auto' radius='xl' />
      <Skeleton height={8} mt={6} width='52%' ml='auto' radius='xl' />
      <Skeleton height={8} mt={6} width='42%' ml='auto' radius='xl' />
      <Skeleton height={8} mt={20} width='40%' radius='xl' />
      <Skeleton height={8} mt={6} width='47%' radius='xl' />
      <Skeleton height={8} mt={6} width='30%' radius='xl' />
      <Skeleton height={8} mt={20} width='50%' ml='auto' radius='xl' />
      <Skeleton height={8} mt={6} width='33%' ml='auto' radius='xl' />
      <Skeleton height={8} mt={6} width='40%' ml='auto' radius='xl' />
      <Skeleton height={8} mt={20} width='40%' radius='xl' />
      <Skeleton height={8} mt={6} width='36%' radius='xl' />
    </>
  );
};

export default ChatMessageSkeleton;
