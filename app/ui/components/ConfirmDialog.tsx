import * as React from "react";
import { View } from "react-native";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import { theme } from "../style/theme";

type DialogAction = {
  title: string;
  onPress: () => void;
  actionType?: "normal" | "positive" | "destructive";
};

type Props = {
  title?: string;
  message?: string;
  primaryAction: DialogAction;
  secondaryAction?: DialogAction;
};

const ConfirmDialog: React.FC<Props> = ({
  title,
  message,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <View>
      <Portal>
        <Dialog
          visible={true}
          onDismiss={primaryAction.onPress}
          style={{
            width: 320,
            justifyContent: "center",
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          {title && <Dialog.Title>{title}</Dialog.Title>}
          {message && (
            <Dialog.Content>
              <Paragraph>{message}</Paragraph>
            </Dialog.Content>
          )}
          <Dialog.Actions>
            {secondaryAction && (
              <Button
                onPress={secondaryAction.onPress}
                theme={{ colors: { primary: theme.colors.negative } }}
              >
                {secondaryAction.title}
              </Button>
            )}
            <Button onPress={primaryAction.onPress}>
              {primaryAction.title}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ConfirmDialog;
