public class G extends Application{
  
  @Override
  public void onCreate() {
    actionbarMenuBugResolve();

    super.onCreate();
  }

  private void actionbarMenuBugResolve() {
    try {
      ViewConfiguration config = ViewConfiguration.get(this);
      Field menuKeyField = ViewConfiguration.class.getDeclaredField("sHasPermanentMenuKey");
      if (menuKeyField != null) {
        menuKeyField.setAccessible(true);
        menuKeyField.setBoolean(config, false);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
