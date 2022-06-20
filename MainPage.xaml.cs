using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using System.Threading;
using Windows.Storage;
using StepHustler.Models;

// The Blank Page item template is documented at https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace StepHustler
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private DispatcherTimer _timer;
        private Rates[] _rates;
        public MainPage()
        {
            this.InitializeComponent();
        }

        private void Page_Loaded(object sender, RoutedEventArgs e)
        {
            _timer = new DispatcherTimer()
            {
                Interval = TimeSpan.FromSeconds(1),
            };

            _timer.Tick += TimerTick;

            LoadRates();
        }
        private async void LoadRates(string filename = @"DataSource\StepIndex\Rates\M1")
        {
            try
            {
                var rates = new List<Rates>();
                var file = await StorageFile.GetFileFromApplicationUriAsync(new Uri($"ms-appx:///{filename}.tsv"));

                using (var inputStream = await file.OpenReadAsync())
                using (var classicStream = inputStream.AsStreamForRead())
                using (var streamReader = new StreamReader(classicStream))
                {
                    _ = streamReader.ReadLine();

                    while (streamReader.Peek() >= 0)
                    {
                        rates.Add(new Rates(streamReader.ReadLine().Split('\t')));
                    }
                }

                _rates = rates.ToArray();
                rates = null;
            }
            catch (Exception ex)
            {
                LogToConsole(ex.Message, Colors.Red);
            }
        }

        private void TimerTick(object sender, object e)
        {
            try
            {
                
            }
            catch (Exception ex)
            {
                LogToConsole(ex.Message, Colors.Red);
            }
        }

        private void ChartWebViewScriptNotify(object sender, NotifyEventArgs e)
        {

        }

        private void TimerButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if(TimerButton.Content?.ToString() == "Start")
                {
                    _timer.Start();
                    TimerButton.Content = "Stop";
                    LogToConsole("Timer Stopped", Colors.Wheat);

                }
                else
                {
                    _timer.Stop();
                    TimerButton.Content = "Start";
                    LogToConsole("Timer Started", Colors.Wheat);
                }
                
            }
            catch (Exception ex)
            {
                LogToConsole(ex.Message, Colors.Red);
            }
        }
        private void LogToConsole(string message, Color color)
        {
            ConsoleListBox.Items.Add(new ListBoxItem()
            {
                Content = $"{DateTime.Now:HH:mm:ss} {message}",
                Foreground = new SolidColorBrush(color)
            });
        }
    }
}
