#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
